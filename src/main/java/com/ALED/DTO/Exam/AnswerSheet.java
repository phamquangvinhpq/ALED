package com.ALED.DTO.Exam;

import java.util.List;

import com.ALED.entities.Choice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerSheet {
    private int questionId;
    private List<Choice> choices;

    private Integer point;
    
    
    
    
    
    
}
