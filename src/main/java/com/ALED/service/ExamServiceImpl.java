package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ALED.DTO.Exam.AnswerSheet;
import com.ALED.DTO.Exam.ChoiceCorrect;
import com.ALED.DTO.Exam.ChoiceList;
import com.ALED.DTO.Exam.ExamQuestionPoint;
import com.ALED.entities.Exam;
import com.ALED.entities.Question;
import com.ALED.repositories.ExamRepository;

@Service

public class ExamServiceImpl implements ExamService {
	@Autowired
    private ExamRepository examRepository;
	@Autowired
    private SectionService partService;
	@Autowired
    private UserServiceSystem userService;
	@Autowired
    private QuestionService questionService;
	@Autowired
    private ChoiceService choiceService;

    
   

    @Override
    public Exam saveExam(Exam exam) {
        return examRepository.save(exam);
    }

    @Override
    public Page<Exam> findAll(Pageable pageable) {
        return examRepository.findAll(pageable);
    }

    @Override
    public void cancelExam(Integer id) {
        examRepository.cancelExam(id);
    }

    @Override
    public List<Exam> getAll() {
        return examRepository.findAll();
    }

    @Override
    public Optional<Exam> getExamById(Integer id) {
        return examRepository.findById(id);
    }


    


    @Override
    public List<ChoiceList> getChoiceList(List<AnswerSheet> userChoices, List<ExamQuestionPoint> examQuestionPoints) {
        List<ChoiceList> choiceLists = new ArrayList<>();
        userChoices.forEach(userChoice -> {
            ChoiceList choiceList = new ChoiceList();
            Question question = questionService.getQuestionById(userChoice.getQuestionId()).get();
            choiceList.setQuestion(question);
            choiceList.setPoint(userChoice.getPoint());

            List<ChoiceCorrect> choiceCorrects = new ArrayList<>();
            switch (question.getQuestionType().getTypeCode()) {
                case TF: {
                    userChoice.getChoices().forEach(choice -> {
                        ChoiceCorrect choiceCorrect = new ChoiceCorrect();

                        choiceCorrect.setChoice(choice);
                        String choiceText = choiceService.findChoiceTextById(choice.getId());
                        Integer isRealCorrect;
                        if (choice.getChoiceText().equals(choiceText)) {
                            isRealCorrect = 1;
                            choiceList.setIsSelectedCorrected(true);
                        } else {
                            isRealCorrect = 0;
                            choiceList.setIsSelectedCorrected(false);
                        }
                        choiceCorrect.setIsRealCorrect(isRealCorrect);
                        choiceCorrects.add(choiceCorrect);
                    });
                    break;
                }
                case MC: {

                    choiceList.setIsSelectedCorrected(false);
                    userChoice.getChoices().forEach(choice -> {
                        ChoiceCorrect choiceCorrect = new ChoiceCorrect();
                        choiceCorrect.setChoice(choice);
                        Integer isRealCorrect = choiceService.findIsCorrectedById(choice.getId());
                        choiceCorrect.setIsRealCorrect(isRealCorrect);
                        if (choice.getIsCorrected() == isRealCorrect && isRealCorrect == 1) {
                            choiceList.setIsSelectedCorrected(true);
                        }
                        choiceCorrects.add(choiceCorrect);
                    });
                    break;
                }
                case MS: {
                    choiceList.setIsSelectedCorrected(true);
                    userChoice.getChoices().forEach(choice -> {
                        ChoiceCorrect choiceCorrect = new ChoiceCorrect();
                        choiceCorrect.setChoice(choice);
                        Integer isRealCorrect = choiceService.findIsCorrectedById(choice.getId());
                        choiceCorrect.setIsRealCorrect(isRealCorrect);
                        if (choice.getIsCorrected() == 0 && isRealCorrect == 1) {
                            choiceList.setIsSelectedCorrected(false);
                        }
                        choiceCorrects.add(choiceCorrect);
                    });
                    break;
                }
            }

            //set choices
            choiceList.setChoices(choiceCorrects);

            choiceLists.add(choiceList);
        });
        return choiceLists;
    }
}
