package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.LessionDTO;
import com.ALED.entities.Lession;
import com.ALED.entities.Section;
import com.ALED.repositories.LessionRepository;
import com.ALED.repositories.SectionRepository;



@Service
public class LessionService implements ILessionService {

	@Autowired
	private LessionRepository lessionRepository;

	@Autowired
	private SectionRepository sectionRepository;
	

	@Override
	public List<LessionDTO> readAll() {
		List<LessionDTO> lessionDTOs = new ArrayList<LessionDTO>();
		List<Lession> lessions = lessionRepository.findAll();
		for (Lession lession : lessions) {
			LessionDTO lessionDTO = new LessionDTO();
			BeanUtils.copyProperties(lession, lessionDTO);
			lessionDTO.setSection_id(lession.getSection().getId());
			lessionDTOs.add(lessionDTO);
		}
		return lessionDTOs;
	}

	

	@Override
	public LessionDTO delete(Integer id) {
		Optional<Lession> optionalLession = lessionRepository.findById(id);
		if (optionalLession.isPresent()) {
			LessionDTO lessionDTO = new LessionDTO();
			Lession lession = optionalLession.get();
			BeanUtils.copyProperties(lession, lessionDTO);
			lessionRepository.deleteById(id);
			lessionDTO.setSection_id(lession.getSection().getId());
			return lessionDTO;
		} else
			return null;
	}

	@Override
	public LessionDTO detail(Integer id) {
		Optional<Lession> optionalLession = lessionRepository.findById(id);
		if (optionalLession.isPresent()) {
			LessionDTO lessionDTO = new LessionDTO();
			Lession lession = optionalLession.get();
			BeanUtils.copyProperties(lession, lessionDTO);

			lessionDTO.setSection_id(lession.getSection().getId());
			return lessionDTO;
		} else
			return null;
	}

	@Override
	public List<LessionDTO> findpage(Integer pageno, Integer pagesize) {
//		Pageable paging = PageRequest.of(pageno, pagesize);
//
//		Page<LessionDTO> pagedResult = lessionRepository.findAll(paging);
//		
//	            return pagedResult.toList();
		return null;
	}

	@Override
	public LessionDTO create(LessionDTO lessionDTO) {
		Lession lession = new Lession();
		BeanUtils.copyProperties(lessionDTO, lession);
		lession.setSection(sectionRepository.getById(lessionDTO.getSection_id()));// lấy id_section của DTO, tìm trong																				// section có thì set vào
		lessionRepository.save(lession);
		lessionDTO.setId(lession.getId());
		return lessionDTO;
	}
	
	@Override
	public LessionDTO update(LessionDTO lessionDTO) {
		Optional<Lession> optionalLession = lessionRepository.findById(lessionDTO.getId());
		if (optionalLession.isPresent()) {
			Lession lession = optionalLession.get();
			BeanUtils.copyProperties(lessionDTO, lession);
			Optional<Section> optional = sectionRepository.findById(lessionDTO.getSection_id());
			lession.setSection(optional.get());
			lessionRepository.save(lession);
		}
		return lessionDTO;
	}
	

	@Override
	public List<LessionDTO> findAllBySection(Integer sectionId) {
		List<LessionDTO> lessionDTOs = new ArrayList<LessionDTO>();
		List<Lession> lessions = lessionRepository.findAllBySection(sectionId);
		for (Lession lession : lessions) {
			LessionDTO lessionDTO = new LessionDTO();
			BeanUtils.copyProperties(lession, lessionDTO);
			lessionDTO.setSection_id(lession.getSection().getId());
			lessionDTOs.add(lessionDTO);
		}
		return lessionDTOs;
	}



	@Override
	public Lession updatestatus(Lession lession) {
	Lession Lessions = lessionRepository.findByyid(lession.getId());
	
		if (Lessions != null) {
			Lessions.setStatus(lession.getStatus());
			lessionRepository.save(Lessions);
		}
		
		return lession;
	}

}
