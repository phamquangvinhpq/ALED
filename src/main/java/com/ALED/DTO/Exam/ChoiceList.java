package com.ALED.DTO.Exam;

import java.util.List;

import com.ALED.entities.Question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceList{
    private Question question;
    private List<ChoiceCorrect> choices;
    private Integer point;
    private Boolean isSelectedCorrected;
}
