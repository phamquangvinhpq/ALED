package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.entities.QuestionType;
import com.ALED.enums.EQTypeCode;
import com.ALED.service.QuestionTypeService;

import lombok.extern.slf4j.Slf4j;

@RequestMapping(value = "/api")
@RestController
@Slf4j
public class QuestionTypeController {
    private QuestionTypeService questionTypeService;

    @Autowired
    public QuestionTypeController(QuestionTypeService questionTypeService) {
        this.questionTypeService = questionTypeService;
    }

    @GetMapping(value = "/question-types")
    public List<QuestionType> getAllQuestionType() {
        List<QuestionType> questionTypeList = questionTypeService.getQuestionTypeList();
        log.info(questionTypeList.toString());

        return questionTypeList;

    }

    @GetMapping(value = "/question-types/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('LECTURER')")
    public QuestionType getQuestionTypeById(@PathVariable Integer id) {
        QuestionType questionType = questionTypeService.getQuestionTypeById(id).get();
        return questionType;
    }

    @GetMapping(value = "/question-types/{typeCode}")
    public QuestionType getQuestionTypeByTypeCode(@PathVariable String typeCode) {
        EQTypeCode eqTypeCode = EQTypeCode.valueOf(typeCode);
        QuestionType questionType = questionTypeService.getQuestionTypeByCode(eqTypeCode).get();
        return questionType;
    }
    

//    @PostMapping(value = "/question-types")
//    public ResponseEntity<Object> createQuestionType(@Valid @RequestBody QuestionType questionType) {
//        try {
//            questionTypeService.saveQuestionType(questionType);
//            return ResponseEntity.ok().body(new ServiceResult(HttpStatus.CREATED.value(), "Created question type successfully!", questionType));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.toString());
//        }
//
//
//    }
//
//    @PutMapping(value = "/question-types/{id}")
//    public ResponseEntity<?> updateCourse(@Valid @RequestBody QuestionType questionType, @PathVariable Integer id) {
//        Optional<QuestionType> questionTypeOptional = questionTypeService.getQuestionTypeById(id);
//        if (!questionTypeOptional.isPresent()) {
//            throw new EntityNotFoundException("Not found with question type id: " + id + " successfully!");
//        }
//        questionType.setId(id);
//        questionTypeService.saveQuestionType(questionType);
//        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.OK.value(), "Update question type with id: " + id, questionType));
//    }
//
//    @DeleteMapping(value = "/question-types/{id}")
//    public ResponseEntity<?> deleteCourse(@PathVariable Integer id) {
//        Optional<QuestionType> questionTypeOptional = questionTypeService.getQuestionTypeById(id);
//        if (!questionTypeOptional.isPresent()) {
//            throw new EntityNotFoundException("Not found with question type id:" + id + " successfully!");
//        }
//        questionTypeService.delete(id);
//        return ResponseEntity.ok().body(new ServiceResult(HttpStatus.NO_CONTENT.value(), "Deleted question type with id: " + id + " successfully!", null));
//    }
}
