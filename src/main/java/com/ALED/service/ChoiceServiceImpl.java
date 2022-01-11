package com.ALED.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.repositories.ChoiceRepository;

@Service
public class ChoiceServiceImpl implements ChoiceService {

    private ChoiceRepository choiceRepository;

    @Autowired
    public ChoiceServiceImpl(ChoiceRepository choiceRepository) {
        this.choiceRepository = choiceRepository;
    }

    @Override
    public Integer findIsCorrectedById(Integer id) {
        return choiceRepository.findIsCorrectedById(id);
    }

    @Override
    public String findChoiceTextById(Integer id) {
        return choiceRepository.findChoiceTextById(id);
    }
}
