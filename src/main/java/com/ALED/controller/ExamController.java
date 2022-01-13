package com.ALED.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.Exam.AnswerSheet;
import com.ALED.DTO.Exam.ChoiceList;
import com.ALED.DTO.Exam.ExamDetail;
import com.ALED.DTO.Exam.ExamQuestionList;
import com.ALED.DTO.Exam.ExamQuestionPoint;
import com.ALED.DTO.Exam.ExamResult;
import com.ALED.DTO.Exam.PageResult;
import com.ALED.DTO.Exam.QuestionExamReport;
import com.ALED.Exception.ResourceNotFoundException;
import com.ALED.entities.Choice;
import com.ALED.entities.Exam;
import com.ALED.entities.ExamUser;
import com.ALED.entities.Question;
import com.ALED.entities.Section;
import com.ALED.entities.Users;
import com.ALED.repositories.ExamRepository;
import com.ALED.repositories.ExamUserRepository;
import com.ALED.repositories.SectionRepository;
import com.ALED.service.ExamService;
import com.ALED.service.ExamUserService;
import com.ALED.service.QuestionService;
import com.ALED.service.SectionService;
import com.ALED.service.UserServiceSystem;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;

@RestController
@RequestMapping(value = "/api")
public class ExamController {
	Logger logger = LoggerFactory.getLogger(ExamController.class);
	@Autowired
	private SectionRepository sectionRepository;
	private ExamService examService;
	private QuestionService questionService;
	private UserServiceSystem userService;
	private SectionService partService;
	private ExamUserService examUserService;
	private ObjectMapper mapper;
	
	@Autowired
	private ExamRepository examRepository;
	@Autowired
	private ExamUserRepository examUserRepository;

	@Autowired
	public ExamController(ExamService examService, QuestionService questionService, UserServiceSystem userService,
			SectionService partService, ExamUserService examUserService, ObjectMapper mapper) {
		this.examService = examService;
		this.questionService = questionService;
		this.userService = userService;
		this.partService = partService;
		this.examUserService = examUserService;
		this.mapper = mapper;
	}

//    @GetMapping(value = "/exams")
//    public ResponseEntity<List<Exam>> getAll() {
//        List<Exam> exams = examService.getAll();
//        if (exams.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(exams, HttpStatus.OK);
//    }

	// lấy toàn bộ danh sách đề thi
	@GetMapping(value = "/exams")
	public PageResult getExamsByPage(@PageableDefault(page = 0, size = 10, sort = "id") Pageable pageable) {
		Page<Exam> examPage;

		examPage = examService.findAll(pageable);

		return new PageResult(examPage);

	}

	// lấy danh sách dề thi với user
	@GetMapping(value = "/exams/list-all-by-user")
	public ResponseEntity<List<ExamUser>> getAllByUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = auth.getName();
		logger.error(username);

		List<ExamUser> examUserList = examUserService.getExamListByUsername(username);
		Date currentDate = new Date();
		examUserList.forEach(examUser -> {
			if (currentDate.compareTo(examUser.getExam().getBeginExam()) < 0) {
				examUser.getExam().setLocked(false);
			} else {
				examUser.getExam().setLocked(true);

			}
		});
		return new ResponseEntity(examUserList, HttpStatus.OK);

	}

//lấy danh sách đề thi của user-exam với id dề thi 
	@GetMapping(value = "/exams/exam-user/{examId}")
	public ResponseEntity<ExamUser> getExamUserById(@PathVariable Integer examId) throws ParseException {

		String username = userService.getUserName();
		
		Optional<ExamUser> examUser = Optional.ofNullable(examUserService.findByExamAndUser(examId, username));
		if (!examUser.isPresent()) {
			return new ResponseEntity("Không tìm thấy exam user này", HttpStatus.NOT_FOUND);
		}
		Date timeExam = examUser.get().getExam().getBeginExam();
		Date now = new Date();

//        if (examUser.get().getIsFinished().equals(false) && now.compareTo(timeExam) > 0) {
//            examUser.get().setIsFinished(true);
//            examUser.get().setTimeFinish(timeExam);
//        }
		return ResponseEntity.ok(examUser.get());
	}

	// lấy danh sách câu hỏi của đề thi

//	[{"questionId":2,"choices":[{"id":1,"choiceText":"bo cau hoi","isCorrected":1},{"id":2,"choiceText":"dap án thư 2","isCorrected":0},{"id":3,"choiceText":"dap án thư 3","isCorrected":0},{"id":4,"choiceText":"dap án thư 4","isCorrected":0}],"point":5},{"questionId":4,"choices":[{"id":17,"choiceText":"đáp án 1=2","isCorrected":1},{"id":18,"choiceText":"dap án thư 2=9","isCorrected":0},{"id":19,"choiceText":"dap án thư 3=6","isCorrected":0},{"id":20,"choiceText":"dap án thư 4=5","isCorrected":0}],"point":5}]

	@GetMapping(value = "/exams/{examId}/questions")
	public ResponseEntity<ExamQuestionList> getAllQuestions(@PathVariable Integer examId,@RequestParam("username") String username) throws IOException, MethodArgumentNotValidException {
		
		
		Users user = userService.getUserByUsername(username).get();
		ExamQuestionList examQuestionList = new ExamQuestionList();
		Optional<Exam> exam = examService.getExamById(examId);
		if (!exam.isPresent()) {
			return new ResponseEntity("Không tìm thấy exam này", HttpStatus.NOT_FOUND);
		}

		ExamUser examUser = examUserService.findByExamAndUser(examId, username);
		if(examUser==null)
		{
			
			Exam ex=exam.get();
			examUserService.create(ex, user);
			throw new ResourceNotFoundException("loi");
		}
		if(examUser.getIsFinished().equals(true)) {
			throw new ConstraintViolationException(null, null);
			
		}
		else if(examUser.getIsStarted().equals(true) && examUser.getIsFinished().equals(false)) {
//            Get answersheet
			// Convert question data json to array object
			List<AnswerSheet> choiceUsers = convertAnswerJsonToObject(examUser);
			List<Question> questions1 = new ArrayList<>();
			choiceUsers.forEach(answerSheet1 -> {
				Question question = questionService.getQuestionById(answerSheet1.getQuestionId()).get();
				question.setChoices(answerSheet1.getChoices());
				question.setPoint(answerSheet1.getPoint());
				questions1.add(question);
			});

			examQuestionList.setQuestions(questions1);
			examQuestionList.setExam(exam.get());
		}
		else {

			// save to answer sheet
//            convert question json to object list
			ObjectMapper mapper = new ObjectMapper();
			String answerSheet = exam.get().getQuestionData();
			List<ExamQuestionPoint> examQuestionPoints = mapper.readValue(answerSheet,
					new TypeReference<List<ExamQuestionPoint>>() {
					});

			List<Question> questions = questionService.getQuestionPointList(examQuestionPoints);

//			lỗi đang thay đổi luôn giá trị mặc đáp án đúng của câu hỏi, tìm cách đẻ làm sao khi nó save nó sẽ không update cả cái câu hỏi
			List<AnswerSheet> answerSheets = questionService.convertFromQuestionList(questions);
//            Convert answer sheet to json

			String answerSheetConvertToJson = mapper.writeValueAsString(answerSheets);

			examUser.setAnswerSheet(answerSheetConvertToJson);
			examUser.setIsStarted(true);
			examUser.setTimeStart(new Date());
			examUserService.update(examUser);

			String answerSheet2 = exam.get().getQuestionData();
			List<ExamQuestionPoint> examQuestionPoints2 = mapper.readValue(answerSheet2,
					new TypeReference<List<ExamQuestionPoint>>() {
					});

			List<Question> questions2 = questionService.getQuestionPointList(examQuestionPoints2);

//			lỗi đang thay đổi luôn giá trị mặc đáp án đúng của câu hỏi, tìm cách đẻ làm sao khi nó save nó sẽ không update cả cái câu hỏi

//            Convert answer sheet to json

			List<AnswerSheet> answerSheets3 = new ArrayList<>();
			questions2.forEach(question -> {

				List<Choice> choices = question.getChoices();
				choices.stream().filter(s -> s.getIsCorrected() == 2).forEach(s -> {
					s.setIsCorrected(1);
				});

				AnswerSheet answerSheet3 = new AnswerSheet(question.getId(), choices, question.getPoint());
				answerSheets3.add(answerSheet3);
			});

			examUserService.update(examUser);

			List<Question> questions1 = new ArrayList<>();
			answerSheets.forEach(answerSheet1 -> {
				Question question = questionService.getQuestionById(answerSheet1.getQuestionId()).get();
				question.setChoices(answerSheet1.getChoices());
				question.setPoint(answerSheet1.getPoint());
				questions1.add(question);
			});
			examQuestionList.setQuestions(questions1);
			examQuestionList.setExam(exam.get());
			logger.error("case 3");

		}

		return new ResponseEntity(examQuestionList, HttpStatus.OK);

	}

//tạo đề thi mới 
	@PostMapping(value = "/exams")
	public ResponseEntity<?> createExam(@Valid @RequestBody Exam exam, @RequestParam Integer partId,
			@RequestParam("username") String username,@RequestParam boolean isShuffle, boolean locked) {
		try {
			
			Users user = userService.getUserByUsername(username).get();

			Optional<Section> part = sectionRepository.findById(partId);
			if (part.isPresent()) {
				exam.setSection(part.get());
			}
			exam.setUser(user);
			exam.setCanceled(false);
			logger.error("begin: " + exam.getBeginExam());

			this.examService.saveExam(exam);
//			List<Users> users = userService.findAllByIntakeId(intakeId);
//			List<Users> users = (List<Users>) userService.getUserByUsername(username).get();
			examUserService.create(exam, user);

//            Convert question data json to array object
			ObjectMapper mapper = new ObjectMapper();
			String questionJson = exam.getQuestionData();
			List<ExamQuestionPoint> examQuestionPoints = mapper.readValue(questionJson,
					new TypeReference<List<ExamQuestionPoint>>() {
					});

			return ResponseEntity.ok(exam);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
		}
	}

	// lấy đề thi với id đề thi
	@GetMapping(value = "/exams/{id}")
	public ResponseEntity<Exam> getExamById(@PathVariable("id") Integer id) {
		Optional<Exam> exam = examService.getExamById(id);
		if (!exam.isPresent()) {
			return new ResponseEntity<>(exam.get(), HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(exam.get(), HttpStatus.OK);
	}

	// cập nhập đề thi
	
//	vào trong phần lession tạo thêm 1 type là đề thi ấn vào hiển thị from tạo đề thi tạo xong, lưu lại id bài thi vào 
//	link video là xong đề thi
	@PutMapping(value = "/exams/{examId}/questions-by-user")
	public void saveUserExamAnswer(@RequestBody List<AnswerSheet> answerSheets, @PathVariable Integer examId,
			@RequestParam boolean isFinish,@RequestParam("username") String username) throws JsonProcessingException {
		Users user = userService.getUserByUsername(username).get();
		ExamUser examUser = examUserService.findByExamAndUser(examId, username);
		if (examUser == null) {
			throw new EntityNotFoundException("Not found this exam");
		} else {
			if (examUser.getIsFinished() == true) {
				throw new ExceptionInInitializerError("This exam was end");
			}

			ObjectMapper mapper = new ObjectMapper();
			String answerSheetConvertToJson = mapper.writeValueAsString(answerSheets);
			examUser.setAnswerSheet(answerSheetConvertToJson);
			examUser.setIsFinished(isFinish);
			if (isFinish == true) {
				examUser.setTimeFinish(new Date());
			}
			examUserService.update(examUser);
		}

	}

	// kết quả bài thi all
	@GetMapping(value = "/exams/{examId}/result/all")
	public ResponseEntity getResultExamAll(@PathVariable Integer examId) throws IOException {
		List<ExamResult> examResults = new ArrayList<>();
		Optional<Exam> exam = examService.getExamById(examId);
		if (!exam.isPresent()) {
			return new ResponseEntity("Không tìm thấy exam", HttpStatus.NOT_FOUND);
		}
		List<ExamUser> examUserList = examUserService.findAllByExam_Id(exam.get().getId());
		List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
		Date now = new Date();
		for (ExamUser examUser : examUserList) {
			ExamResult examResult = new ExamResult();
			examResult.setExam(exam.get());
			List<AnswerSheet> userChoices = convertAnswerJsonToObject(examUser);
			if (userChoices.isEmpty()) {
				examResult.setTotalPoint(null);
				examResult.setUser(examUser.getUser());
				examResult.setExamStatus(0);

			} else {
				List<ChoiceList> choiceLists = examService.getChoiceList(userChoices, examQuestionPoints);
				examResult.setChoiceList(choiceLists);
				Double totalPoint = 0.0;
				for (ChoiceList choice : choiceLists) {
					if (choice.getIsSelectedCorrected().equals(true)) {
						totalPoint += choice.getPoint();
					}
				}
				examResult.setTotalPoint(totalPoint);
				if (examUser.getTotalPoint() == -1) {
					examUser.setTotalPoint(totalPoint);
					examUserService.update(examUser);
				}
			}

			examResult.setUser(examUser.getUser());
			examResult.setUserTimeBegin(examUser.getTimeStart());
			examResult.setUserTimeFinish(examUser.getTimeFinish());
			if (exam.get().getFinishExam().compareTo(now) < 0 && examUser.getIsStarted().equals(false)) {
				examResult.setExamStatus(-2);
			} else if (examUser.getIsStarted().equals(false) && exam.get().getFinishExam().compareTo(now) == 1) {
				examResult.setExamStatus(0);
			} else if (examUser.getIsFinished().equals(true)) {
				examResult.setExamStatus(-1);
			} else {
				examResult.setExamStatus(1);
			}
			examResults.add(examResult);
		}
		return new ResponseEntity(examResults, HttpStatus.OK);
	}

	@GetMapping(value = "/exams/{examId}/result/all/question-report")
	public ResponseEntity getResultExamQuestionsReport(@PathVariable Integer examId) throws IOException {

		Optional<Exam> exam = examService.getExamById(examId);
		if (!exam.isPresent()) {
			logger.error("NOT found");
			return new ResponseEntity("Không tìm thấy exam", HttpStatus.NOT_FOUND);
		}
		List<ExamUser> finishedExamUser = examUserService.findExamUsersByIsFinishedIsTrueAndExam_Id(examId);
		if (finishedExamUser.size() == 0) {
			return new ResponseEntity("Chưa có người dùng thực hiện bài kiểm tra", HttpStatus.OK);
		}
		ExamUser firstExamUser = finishedExamUser.get(0);
		List<QuestionExamReport> questionExamReports = new ArrayList<>();
		List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
//        convert answer sheet of first user
		List<AnswerSheet> userChoicesFirstExam = convertAnswerJsonToObject(firstExamUser);
//        get exam result of first user
		List<ChoiceList> firstChoiceList = examService.getChoiceList(userChoicesFirstExam, examQuestionPoints);
		for (ChoiceList choice : firstChoiceList) {
			QuestionExamReport questionExamReport = new QuestionExamReport();
			questionExamReport.setQuestion(choice.getQuestion());

			if (choice.getIsSelectedCorrected().equals(true)) {
				questionExamReport.setCorrectTotal(1);
			} else {
				questionExamReport.setCorrectTotal(0);
			}
			questionExamReports.add(questionExamReport);
		}

//        done for first user
		if (questionExamReports.size() == 0) {
			return new ResponseEntity(questionExamReports, HttpStatus.OK);
		}
		for (int i = 1; i < finishedExamUser.size(); i++) {
			List<AnswerSheet> userChoices = convertAnswerJsonToObject(firstExamUser);
//        get exam result of first user
			List<ChoiceList> choiceList = examService.getChoiceList(userChoices, examQuestionPoints);
			for (ChoiceList choice : firstChoiceList) {

				List<QuestionExamReport> questionExamReportsList = questionExamReports.stream()
						.filter(item -> item.getQuestion().getId() == choice.getQuestion().getId())
						.collect(Collectors.toList());
				QuestionExamReport questionExamReport = questionExamReportsList.get(0);
				if (choice.getIsSelectedCorrected().equals(true)) {
					questionExamReport.setCorrectTotal(questionExamReport.getCorrectTotal() + 1);
				}
			}
		}
		return new ResponseEntity(questionExamReports, HttpStatus.OK);
	}

	@GetMapping(value = "/exams/{examId}/result")
	public ResponseEntity getResultExam(@PathVariable Integer examId) throws IOException {
		ExamResult examResult = new ExamResult();
		String username = userService.getUserName();
		Optional<Exam> exam = examService.getExamById(examId);

		if (!exam.isPresent()) {
			return new ResponseEntity("Không tìm thấy exam", HttpStatus.NOT_FOUND);
		}
//        Set exam for examResult
		examResult.setExam(exam.get());
//        Set list question user's choice for examResult
		List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
		ExamUser examUser = examUserService.findByExamAndUser(examId, username);
		List<AnswerSheet> userChoices = convertAnswerJsonToObject(examUser);
		List<ChoiceList> choiceLists = examService.getChoiceList(userChoices, examQuestionPoints);
		examResult.setChoiceList(choiceLists);
		Double totalPoint = 0.0;
		for (ChoiceList choice : choiceLists) {
			if (choice.getIsSelectedCorrected().equals(true)) {
				totalPoint += choice.getPoint();
			}
		}
		examResult.setTotalPoint(totalPoint);

		examUser.setTotalPoint(totalPoint);
		examUserService.update(examUser);

		return new ResponseEntity(examResult, HttpStatus.OK);
	}

	@GetMapping(value = "/exams/{examId}/users/{username}/result")
	public ResponseEntity getResultExamByUser(@PathVariable Integer examId, @PathVariable String username)
			throws IOException {
		ExamResult examResult = new ExamResult();
		Optional<Exam> exam = examService.getExamById(examId);
		Users user = userService.getUserByUsername(username).get();
		if (!exam.isPresent()) {
			return new ResponseEntity("Không tìm thấy exam", HttpStatus.NOT_FOUND);
		}
//        Set exam for examResult
		examResult.setExam(exam.get());
		examResult.setUser(user);

//        Set list question user's choice for examResult
		List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
		ExamUser examUser = examUserService.findByExamAndUser(examId, username);
		List<AnswerSheet> userChoices = convertAnswerJsonToObject(examUser);
		List<ChoiceList> choiceLists = examService.getChoiceList(userChoices, examQuestionPoints);
		examResult.setChoiceList(choiceLists);
		Double totalPoint = 0.0;
		for (ChoiceList choice : choiceLists) {
			if (choice.getIsSelectedCorrected().equals(true)) {
				totalPoint += choice.getPoint();
			}
		}
		examResult.setTotalPoint(totalPoint);
	
			examUser.setTotalPoint(totalPoint);
			examUserService.update(examUser);

		examResult.setUserTimeFinish(examUser.getTimeFinish());
		examResult.setUserTimeBegin(examUser.getTimeStart());
		return new ResponseEntity(examResult, HttpStatus.OK);
	}

	public List<AnswerSheet> convertAnswerJsonToObject(ExamUser examUser) throws IOException {

//        ObjectMapper mapper = new ObjectMapper();
		if (Strings.isNullOrEmpty(examUser.getAnswerSheet())) {
			return Collections.emptyList();
		}

		String answerSheet = examUser.getAnswerSheet();
		List<AnswerSheet> choiceUsers = mapper.readValue(answerSheet, new TypeReference<List<AnswerSheet>>() {
		});
		return choiceUsers;
	}

	@GetMapping(value = "/exam/{id}/question-text")
	public List<ExamDetail> getQuestionTextByExamId(@PathVariable Integer id) throws IOException {
		Optional<Exam> exam = examService.getExamById(id);
		List<ExamQuestionPoint> examQuestionPoints = convertQuestionJsonToObject(exam);
		List<ExamDetail> questions = new ArrayList<>();
		examQuestionPoints.forEach(examQuestionPoint -> {
			ExamDetail examDetail = new ExamDetail();
			Question question = questionService.getQuestionById(examQuestionPoint.getQuestionId()).get();
			examDetail.setQuestionText(question.getQuestionText());
			examDetail.setPoint(examQuestionPoint.getPoint());
			examDetail.setQuestionType(question.getQuestionType().getDescription());
			questions.add(examDetail);
		});
		return questions;
	}

	public List<ExamQuestionPoint> convertQuestionJsonToObject(Optional<Exam> exam) throws IOException {
//        ObjectMapper mapper = new ObjectMapper();
		String answerSheet = exam.get().getQuestionData();
		List<ExamQuestionPoint> examQuestionPoints = mapper.readValue(answerSheet,
				new TypeReference<List<ExamQuestionPoint>>() {
				});
		return examQuestionPoints;
	}

//	@GetMapping(value = "/exams/schedule")
//	public List<ExamCalendar> getExamCalendar() {
//		Date now = new Date();
//		String username = userService.getUserName();
//		List<ExamUser> examUsers = examUserService.getExamListByUsername(username);
//		List<ExamCalendar > examCalendars = new ArrayList<ExamCalendar>();
//		examUsers.forEach(examUser -> {
//			ExamCalendar examCalendar = new ExamCalendar();
//			examCalendar.setCourseName(examUser.getExam().getPart().getCourse().getName());
//			examCalendar.setExamTitle(examUser.getExam().getTitle());
//			examCalendar.setCourseCode(examUser.getExam().getPart().getCourse().getCourseCode());
//			examCalendar.setPartName(examUser.getExam().getPart().getName());
//			examCalendar.setExamId(examUser.getExam().getId());
//			examCalendar.setDurationExam(examUser.getExam().getDurationExam());
//			examCalendar.setBeginDate(examUser.getExam().getBeginExam());
//			examCalendar.setFinishDate(examUser.getExam().getFinishExam());
////            if (examUser.getIsFinished().equals(true)) {
////                examCalendar.setCompleteString("Completed");
////                examCalendar.setCompleted(true);
////            } else {
////                examCalendar.setCompleteString("Coming");
////                examCalendar.setCompleted(false);
////            }
//
//			if (examUser.getExam().getFinishExam().compareTo(now) < 0 && examUser.getIsStarted().equals(false)) {
//				examCalendar.setCompleteString("Missed");
//				examCalendar.setIsCompleted(-2);
//			} else if (examUser.getIsStarted().equals(false) && examUser.getExam().getBeginExam().compareTo(now) == 1) {
//				examCalendar.setCompleteString("Not yet started");
//				examCalendar.setIsCompleted(0);
//			} else if (examUser.getIsFinished().equals(true)) {
//				examCalendar.setCompleteString("Completed");
//				examCalendar.setIsCompleted(-1);
//			} else {
//				examCalendar.setCompleteString("Doing");
//				examCalendar.setIsCompleted(1);
//			}
//
//			examCalendars.add(examCalendar);
//
//		});
//		return examCalendars;
//	}
	
	@GetMapping("/getexambyid/{id}")
	public List<Exam> getexambyid(@PathVariable("id") Integer id){
		return 	examRepository.findByCreated_by_id(id);
		
		
	}
	
	
	@PutMapping("/lamlai")
	public void lamlai(@RequestParam("id") Integer id,@RequestParam("username") String username) {
		ExamUser examUser = examUserService.findByExamAndUser(id, username);
		
	
			examUserRepository.delete(examUser);
			
	}

	@GetMapping(value = "/exams/{id}/cancel")
	public void cancelExam(@PathVariable Integer id) {
		String username = userService.getUserName();
		Users user = userService.getUserByUsername(username).get();
		Date now = new Date();
		Exam exam = examService.getExamById(id).get();
		if (exam.getBeginExam().compareTo(now) > 0) {

//            exam.setCanceled(true);
			examService.cancelExam(id);
			logger.error("LLLLL");

		}
	}

}
