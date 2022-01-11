package com.ALED.DTO.Exam;

import java.util.List;

import com.ALED.entities.Exam;
import com.ALED.entities.Question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamQuestionList {
    private Exam exam;
    private List<Question> questions;
    private int remainingTime;
}
