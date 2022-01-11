package com.ALED.DTO.Exam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExamDetail {
    private String questionText;
    private String difficultyLevel;
    private int point;
    private String questionType;
}
