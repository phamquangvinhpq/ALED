package com.ALED.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ALED.entities.chungchi;

public interface IChungchiService {
	
	void addchungchi(chungchi chungchi);
	
	List<chungchi> getallchungchi();

}
