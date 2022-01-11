package com.ALED.DTO.Exam;

import java.util.Date;
import java.util.List;

import com.ALED.entities.Exam;
import com.ALED.entities.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamResult {
    private Exam exam;
    private List<ChoiceList> choiceList;
    private Double totalPoint;
    private Users user;
    private Date userTimeBegin;
    private Date userTimeFinish;
    private int examStatus;
    private int remainingTime;


    public ExamResult(Exam exam, List<ChoiceList> choiceList, Double totalPoint) {
        this.exam = exam;
        this.choiceList = choiceList;
        this.totalPoint = totalPoint;
    }


}
