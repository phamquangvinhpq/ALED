package com.ALED.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseModel {

    private Integer returnCode;
    private Object data;

    public ResponseModel(Integer returnCode) {
        this.returnCode = returnCode;
    }
}
