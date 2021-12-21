package com.ALED.service;

import java.util.List;

import com.ALED.DTO.QADTO;

public interface IQAService {
	List<QADTO> getAll(QADTO dto);
	QADTO save(QADTO dto);
	QADTO update(QADTO dto);
	List<QADTO> getBystatus(Integer status, Integer users_id);

}
