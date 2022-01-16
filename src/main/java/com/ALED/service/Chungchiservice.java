package com.ALED.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.entities.chungchi;
import com.ALED.repositories.ChungchiRepstory;
@Service
public class Chungchiservice implements IChungchiService {
	@Autowired
	private ChungchiRepstory chungchiRepstory;

	@Override
	public void addchungchi(chungchi chungchi) {
		chungchiRepstory.save(chungchi);
	}

	@Override
	public List<chungchi> getallchungchi() {
		
		return chungchiRepstory.findAll();
	}

}
