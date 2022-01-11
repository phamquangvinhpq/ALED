package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
		int soLuongNguoiMua = courseRepository.totalStudentBuyCourse(SectionDTO.getCourse_id());
		if (soLuongNguoiMua > 0) {
			throw new RuntimeException("Khóa học đã có người mua, nên bạn không được thêm");
		}
		List<Section> listEntity = sectionRepository.findByCourseId(SectionDTO.getCourse_id());
		if (listEntity.size() >= 10) {
			throw new RuntimeException("Tổng số chương tối đa là 10");
		}
		Section section =new Section();
		BeanUtils.copyProperties(SectionDTO, section);
		section.setCourse(courseRepository.getById(SectionDTO.getCourse_id()));
		sectionRepository.save(section);
		SectionDTO.setId(section.getId());
		return SectionDTO;
	}



	@Override
	public SectionDTO update(SectionDTO dto) {
		int soLuongNguoiMua = courseRepository.totalStudentBuyCourse(dto.getCourse_id());
		if (soLuongNguoiMua > 0) {
			throw new RuntimeException("Khóa học đã có người mua, nên bạn không được cập nhật");
		}
		Section entity = sectionRepository.getById(dto.getId());
		BeanUtils.copyProperties(dto, entity);
		sectionRepository.save(entity);
		return dto;
		
	}



	@Override
	public SectionDTO delete(Integer id) {
		SectionDTO section = new SectionDTO();
		Optional<Section> optional = sectionRepository.findById(id);
		if(optional.isPresent()) {
			Section entity = optional.get();
			int soLuongNguoiMua = courseRepository.totalStudentBuyCourse(entity.getCourse().getId());
			if (soLuongNguoiMua > 0) {
				throw new RuntimeException("Khóa học đã có người mua, nên bạn không được xóa");
			}
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
	public List<SectionDTO> detailcour(Integer id,int page,int size) {
		List<SectionDTO> listSection = new ArrayList<SectionDTO>();
		List<Section> entities = new ArrayList<Section>();
		Pageable pageable = PageRequest.of(page, size);
			Page<Section> page2 =	sectionRepository.timcour(id,pageable);
			entities = page2.getContent();
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



	@Override
	public String finbykhoahocuser(Integer user_id, Integer course_id) {
		
		String a = sectionRepository.finbykhoahocAuthor(user_id, course_id);
		
		if(a != null)
		{
			return "yes";
		}
	return "no";
	}



	

	

	

}
