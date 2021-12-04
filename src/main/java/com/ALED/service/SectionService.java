package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.SectionDTO;
import com.ALED.entities.Section;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.SectionRepository;


@Service
public class SectionService implements ISectionService {

	@Autowired
	private SectionRepository sectionRepository;
	
	@Autowired
	private CourseRepository courseRepository;
	
	@Override
	public List<SectionDTO> readAll() {
		List<SectionDTO> listSection = new ArrayList<SectionDTO>();
		List<Section> entities = sectionRepository.findAll();
		for (Section Sections : entities) {
			SectionDTO SectionDTO = new SectionDTO();
			BeanUtils.copyProperties(Sections, SectionDTO);
			SectionDTO.setCourse_id(Sections.getCourse().getId());
			listSection.add(SectionDTO);
		}
		return listSection;
		

		
	}



	@Override
	public SectionDTO create(SectionDTO SectionDTO) {
		Section section =new Section();
		BeanUtils.copyProperties(SectionDTO, section);
		section.setCourse(courseRepository.getById(SectionDTO.getCourse_id()));
		sectionRepository.save(section);
		SectionDTO.setId(section.getId());
		return SectionDTO;
	}



	@Override
	public SectionDTO update(SectionDTO section) {
		Optional<Section> optional = sectionRepository.findById(section.getId());
		if(optional.isPresent()) {
			Section entity = optional.get();
			BeanUtils.copyProperties(section, entity);
			sectionRepository.save(entity);
		}
		return section;
		
	}



	@Override
	public SectionDTO delete(Integer id) {
		SectionDTO section = new SectionDTO();
		Optional<Section> optional = sectionRepository.findById(id);
		if(optional.isPresent()) {
			Section entity = optional.get();
			BeanUtils.copyProperties(entity, section);
			sectionRepository.delete(entity);
		}
		return section;
	}



	@Override
	public SectionDTO detail(Integer id) {
		Optional<Section> optional = sectionRepository.findById(id);
		if (optional.isPresent()) {
			SectionDTO sectionDTO = new SectionDTO();
			Section section = optional.get();
			BeanUtils.copyProperties(section, sectionDTO);
			
			sectionDTO.setCourse_id(section.getCourse().getId());
			return sectionDTO;
		}
		else
			return null;
	}
	



	@Override
	public List<SectionDTO> findpage(Integer pageno, Integer pagesize) {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public List<SectionDTO> detailcour(Integer id) {
		List<SectionDTO> listSection = new ArrayList<SectionDTO>();
		List<Section> entities = sectionRepository.timcour(id);
		for (Section Sections : entities) {
			SectionDTO SectionDTO = new SectionDTO();
			BeanUtils.copyProperties(Sections, SectionDTO);
			SectionDTO.setCourse_id(Sections.getCourse().getId());
			listSection.add(SectionDTO);
		}
		return listSection;
	}



	@Override
	public String muakhoahoc(Integer user_id, Integer course_id) {
			String a = sectionRepository.finbykhoahoc(user_id, course_id);
			
			if(a != null)
			{
				return "bought";
			}
		return "nobought";
	}



	

	

	

}
