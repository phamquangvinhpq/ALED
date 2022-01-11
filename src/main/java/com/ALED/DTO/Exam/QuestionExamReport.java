package com.ALED.DTO.Exam;

import com.ALED.entities.Question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionExamReport {
    private Question question;
    private int correctTotal;

}
