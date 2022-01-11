package com.ALED.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.Exam.PageResult;
import com.ALED.DTO.Exam.ServiceResult;
import com.ALED.entities.Question;
import com.ALED.entities.QuestionType;
import com.ALED.entities.Section;
import com.ALED.enums.EQTypeCode;
import com.ALED.repositories.SectionRepository;
import com.ALED.service.QuestionService;
import com.ALED.service.QuestionTypeService;
import com.ALED.service.SectionService;
import com.ALED.service.UserServiceSystem;

import lombok.extern.slf4j.Slf4j;

@RequestMapping(value = "/api")
@RestController
@Slf4j
public class QuestionController {

	@Autowired
	private SectionRepository sectionrepository;

	private QuestionService questionService;
	private SectionService partService;
	private QuestionTypeService questionTypeService;
	private UserServiceSystem userService;

	@Autowired
	public QuestionController(QuestionService questionService, SectionService partService,
			QuestionTypeService questionTypeService, UserServiceSystem userService) {
		this.questionService = questionService;
		this.partService = partService;
		this.questionTypeService = questionTypeService;
		this.userService = userService;
	}

	@GetMapping(value = "/questions")
	public ResponseEntity<ServiceResult> getAllQuestion() {
		List<Question> questionList = questionService.getQuestionList();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = auth.getName();
		System.out.println(username);
		return ResponseEntity.ok()
				.body(new ServiceResult(HttpStatus.OK.value(), "Get question bank successfully!", questionList));
	}

	@GetMapping(value = "/questions/{id}")
	public ResponseEntity<?> getQuestionById(@PathVariable Integer id) {
		Optional<Question> questionOptional = questionService.getQuestionById(id);
		if (!questionOptional.isPresent()) {
			return ResponseEntity.ok()
					.body(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found with id: " + id, null));
		}
		return ResponseEntity.ok().body(questionOptional.get());
	}

	// Get list of question by part
	@GetMapping(value = "/parts/{partId}/questions")
	public PageResult getQuestionsByPart(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable,
			@PathVariable Integer partId) {

		Page<Question> questions;

		Section part = sectionrepository.findById(partId).get();
		questions = questionService.findQuestionsByPart(pageable, part);

//		questions = questionService.findQuestionsBySection_id(pageable, partId);

		return new PageResult(questions);

	}

//    @GetMapping(value = "/parts/{partId}/questions/false/deleted")
//    public PageResult getQuestionsByPartNotDeleted(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable, @PathVariable Integer partId) {
//        Page<Question> questions;
//            Section part = partService.findById(partId).get();
//            questions = questionService.findQuestionsByPartAndDeletedFalse(pageable, part);
//            return new PageResult(questions);
//        return new PageResult(questions);
//    }

//    Get list of question by question type

	@GetMapping(value = "/question-types/{typeId}/questions")
	public ResponseEntity<?> getQuestionByQuestionType(@PathVariable Integer typeId) {
		if (questionTypeService.existsById(typeId)) {

			QuestionType questionType = questionTypeService.getQuestionTypeById(typeId).get();
			List<Question> questionList = questionService.getQuestionByQuestionType(questionType);
			return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(),
					"Get question list with question type id: " + typeId, questionList));
		}
		return ResponseEntity.ok().body(
				new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found question type with id: " + typeId, null));
	}

	@PostMapping(value = "/questions")
	public Question createQuestion(@Validated @RequestBody Question question, @RequestParam String questionType,
			@RequestParam Integer partId) {
		EQTypeCode eqTypeCode = EQTypeCode.valueOf(questionType);
		QuestionType questionType1 = questionTypeService.getQuestionTypeByCode(eqTypeCode).get();

		Section part = sectionrepository.findById(partId).get();
		question.setQuestionType(questionType1);
		question.setSection(part);
		question.setDeleted(false);
		questionService.save(question);
		Question questionCreated = questionService.getQuestionById(question.getId()).get();
		return questionCreated;
	}

	@PutMapping(value = "/questions/{id}")
	public ResponseEntity<?> updateQuestion(@Valid @RequestBody Question question, @PathVariable Integer id) {
		Optional<Question> questionReq = questionService.getQuestionById(id);
		if (!questionReq.isPresent()) {
			return ResponseEntity.ok()
					.body(new ServiceResult(HttpStatus.NOT_FOUND.value(), "Not found with id: " + id, null));
		}
		question.setId(id);
		questionService.save(question);
		return ResponseEntity.ok()
				.body(new ServiceResult(HttpStatus.OK.value(), "Get question with id: " + id, question));
	}

	@GetMapping(value = "/questions/{id}/deleted/{deleted}")
	public ResponseEntity<?> deleteTempQuestion(@PathVariable Integer id, @PathVariable boolean deleted) {
		log.error("Deleted");
		Question question = questionService.getQuestionById(id).get();
		question.setDeleted(deleted);
		questionService.update(question);
		return ResponseEntity.noContent().build();
	}

}
