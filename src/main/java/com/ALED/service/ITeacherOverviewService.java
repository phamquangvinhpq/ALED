package com.ALED.service;

import java.util.List;

import com.ALED.DTO.TeacherOverviewDTO;

public interface ITeacherOverviewService {
	List<TeacherOverviewDTO> getInfo(Integer courseId);
}
