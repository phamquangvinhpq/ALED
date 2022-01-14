package com.ALED.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.LessionDTO;
import com.ALED.entities.Course;
import com.ALED.entities.Lession;
import com.ALED.entities.Section;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.LessionRepository;
import com.ALED.repositories.SectionRepository;



@Service
public class LessionService implements ILessionService {

	@Autowired
	private LessionRepository lessionRepository;

	@Autowired
	private SectionRepository sectionRepository;
	
	@Autowired
	private CourseRepository courseRepository;
	

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
			int soLuongNguoiMua = courseRepository.totalStudentBuyCourse(lession.getSection().getCourse().getId());
			if (soLuongNguoiMua > 0) {
				throw new RuntimeException("Khóa học đã có người mua, nên bạn không được xóa");
			}
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
		Section section = sectionRepository.getById(lessionDTO.getSection_id());
		int soLuongNguoiMua = courseRepository.totalStudentBuyCourse(section.getCourse().getId());
		if (soLuongNguoiMua > 0) {
			throw new RuntimeException("Khóa học đã có người mua, nên bạn không được thêm");
		}
		List<Lession> listEntity = lessionRepository.findBySectionId(lessionDTO.getSection_id());
		if (listEntity.size() >= 10) {
			throw new RuntimeException("Tổng số bài học tối đa là 10");
		}
		Lession lession = new Lession();
		BeanUtils.copyProperties(lessionDTO, lession);
		lession.setSection(sectionRepository.getById(lessionDTO.getSection_id()));// lấy id_section của DTO, tìm trong section có thì set vào
		lession.setDemo(0);
		lessionRepository.save(lession);
		
		lessionDTO.setId(lession.getId());
		
		Optional<Course> op=courseRepository.findById(lessionDTO.getCourseid());
		Course sou=op.get();
		sou.setStatus(0);
		courseRepository.save(sou);
		return lessionDTO;
	}
	
	@Override
	public LessionDTO update(LessionDTO lessionDTO) {
		Section section = sectionRepository.getById(lessionDTO.getSection_id());
		int soLuongNguoiMua = courseRepository.totalStudentBuyCourse(section.getCourse().getId());
		if (soLuongNguoiMua > 0) {
			throw new RuntimeException("Khóa học đã có người mua, nên bạn không được cập nhật");
		}
		List<Lession> listEntity = lessionRepository.findBySectionId(lessionDTO.getSection_id());
		String name = lessionDTO.getName().trim();
		for (Lession lession : listEntity) {
			if (lession.getName().equals(name)) {
				throw new RuntimeException("Tên bài học không được trùng");
			}
		}
		
		Optional<Lession> optionalLession = lessionRepository.findById(lessionDTO.getId());
		if (optionalLession.isPresent()) {
			Lession lession = optionalLession.get();
			BeanUtils.copyProperties(lessionDTO, lession);
			Optional<Section> optional = sectionRepository.findById(lessionDTO.getSection_id());
			lession.setSection(optional.get());
			
			Optional<Course> op=courseRepository.findById(courseRepository.getCoursid(lessionDTO.getCourseid()));
			Course sou = op.get();
			sou.setStatus(0);
			courseRepository.save(sou);
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


	private java.util.Date getTime() {
		Calendar calendar = Calendar.getInstance();
		java.util.Date currentTime = calendar.getTime();
		return currentTime;
	}
	
	@Override
	public Lession updateTime(Lession lession) {
	Lession Lessions = lessionRepository.findByyid(lession.getId());

	System.out.println(getTime());
		if (Lessions != null) {
			Lessions.setTime(getTime());
			lessionRepository.save(Lessions);
		}
		
		return lession;
	}


	@Override
	public Lession getLessionbyTime() {
		return lessionRepository.findBytime();
	
	}


	@Override
	public boolean updateXemThu(Integer id,Integer demo) {
		Lession entity = lessionRepository.getById(id);
		entity.setDemo(demo);
		lessionRepository.save(entity);
		return true;
	}

}
