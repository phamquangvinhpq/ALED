package com.ALED.DTO.Exam;

import com.ALED.entities.Choice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceCorrect {
    private Choice choice;
    private Integer isRealCorrect;
}
