package com.ALED.DTO.Exam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ServiceResult {

    private int statusCode;
    private String message;
    private Object data;

}
