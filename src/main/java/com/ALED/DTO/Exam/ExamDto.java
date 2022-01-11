package com.ALED.DTO.Exam;

import java.util.List;

import com.ALED.entities.Exam;

import lombok.Data;

@Data
public class ExamDto {
    private Exam exam;
    private List<ExamQuestionPoint> examQuestionPoints;
}
