package com.ALED.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ALED.DTO.CourseDTO;
import com.ALED.entities.Course;
import com.ALED.repositories.AuthorRepository;
import com.ALED.repositories.CategoryRepository;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.UserRepository;

@Service
public class CourseService implements ICourseService {

	@Autowired
	CourseRepository courseRepository;

	@Autowired
	AuthorRepository authorRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	IRateService IrateService;

	public String getDate(Date currentDate) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		return dateFormat.format(currentDate);

	}

	public CourseDTO convertToDTO(Course entity) {
		CourseDTO dto = new CourseDTO();
		BeanUtils.copyProperties(entity, dto);
		dto.setCategory_id(entity.getCategory().getId());
		dto.setAuthor_id(entity.getAuthor().getId());
		dto.setUser_id(entity.getUsers().getId());
		dto.setRate(IrateService.avgstar(entity.getId()));
		dto.setUserName(entity.getUsers().getName());
		dto.setCategoryName(entity.getCategory().getName());
		dto.setAuthorName(entity.getAuthor().getName());
		dto.setPrice_discount(entity.getPrice() - entity.getPrice() * entity.getDiscount() / 100);
		dto.setImageAuthor(entity.getAuthor().getImage());
		dto.setImage(entity.getImage());
		dto.setCountChapter(entity.getSections().size());
		dto.setCreate_date(getDate(entity.getCreate_date()));
		dto.setDiscount(entity.getDiscount());
		return dto;
	}

	public Course convertToEntity(CourseDTO dto) {
		Course entity = new Course();
		BeanUtils.copyProperties(dto, entity);
		entity.setCategory(categoryRepository.getById(dto.getCategory_id()));
		entity.setAuthor(authorRepository.getById(dto.getAuthor_id()));
		entity.setUsers(userRepository.getById(dto.getUser_id()));
		entity.setCreate_date(java.util.Calendar.getInstance().getTime());
		return entity;
	}

	@Override
	public List<CourseDTO> readAll() {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		List<Course> lstCourse = courseRepository.findAll();
		for (Course course : lstCourse) {
			lstCourseDTO.add(convertToDTO(course));
		}
		return lstCourseDTO;
	}

	@Override
	public CourseDTO save(CourseDTO dto) {
		Course course = convertToEntity(dto);
		course.setDiscount(0);
		courseRepository.save(course);
		dto.setId(course.getId());
		return dto;
	}

	@Override
	public CourseDTO update(CourseDTO dto) {
		if (dto.getDiscount() > 100 || dto.getDiscount() < 0) {
			throw new RuntimeException("Gi???m gi?? ch??? ???????c nh???p t??? 0 ?????n 100");
		}
		Course entity = courseRepository.getById(dto.getId());
		Integer totalStudentBuyCourse = courseRepository.totalStudentBuyCourse(entity.getId());
		if (totalStudentBuyCourse > 0 && entity.getDiscount() == dto.getDiscount()) {
			throw new RuntimeException("B???n ch??? c?? th??? s???a gi???m gi?? khi kh??a h???c ???? c?? ng?????i mua");
		}
		if (totalStudentBuyCourse > 0 && entity.getDiscount() != dto.getDiscount()) {
			entity.setDiscount(dto.getDiscount());
			courseRepository.save(entity);
			return dto;
		}

		BeanUtils.copyProperties(dto, entity);
		courseRepository.save(entity);
		return dto;
	}

	@Override
	public CourseDTO delete(Integer id) {
		Course entity = courseRepository.getById(id);
		Integer totalStudentBuyCourse = courseRepository.totalStudentBuyCourse(id);
		if (totalStudentBuyCourse > 0) {
			throw new RuntimeException("Kh??ng th??? x??a kh??a h???c v?? ???? c?? ng?????i mua");
		}
		CourseDTO dto = convertToDTO(entity);
		courseRepository.deleteById(id);
		return dto;
	}

	@Override
	public List<CourseDTO> detail(Integer id) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		List<Course> optional = courseRepository.timcoursbyid(id);
		for (Course course : optional) {
			lstCourseDTO.add(convertToDTO(course));
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> findpage(Integer userId, int page, int size) {
		List<Course> courses = new ArrayList<Course>();
		List<CourseDTO> courseDTOs = new ArrayList<CourseDTO>();
		Pageable pageable = PageRequest.of(page, size);
		Page<Course> paging;
		if (userId == null) {
			paging = courseRepository.findAll(pageable);
		} else {
			paging = courseRepository.pagecour(userId, pageable);
			courses = paging.getContent();
			for (Course course : courses) {
				CourseDTO dto = new CourseDTO();
				BeanUtils.copyProperties(course, dto);
				dto.setCategory_id(course.getCategory().getId());
				dto.setAuthor_id(course.getAuthor().getId());
				dto.setUser_id(course.getUsers().getId());
				courseDTOs.add(dto);
			}
		}
		return courseDTOs;
	}

	@Override
	public CourseDTO searchUser(String keyword) {

		return null;
	}

	@Override
	public List<CourseDTO> detailus(Integer id, int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		List<Course> lstCourse = new ArrayList<Course>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses = courseRepository.pagecour(id, paging);
		lstCourse = pageCourses.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getAllByName(String courseName, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (courseName == null) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.findByCourseName(courseName, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			listDto.add(convertToDTO(entity));
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getAllByCategory(Integer categoryId, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (categoryId == null) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.findByCategory(categoryId, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			listDto.add(convertToDTO(entity));
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getAll(int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses = courseRepository.findAll(paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			listDto.add(convertToDTO(entity));
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> buythemost(Integer page, Integer size) {
		Pageable pageable = PageRequest.of(page, size);
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		List<Integer> list = courseRepository.buyTheMost(pageable);
		for (Integer integer : list) {
			Course entity = courseRepository.getById(integer);
			listDto.add(convertToDTO(entity));
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getAllCouAct(int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		List<Course> lstCourse = new ArrayList<Course>();
		Page<Course> page2 = courseRepository.getAllCouAct(paging);
		lstCourse = page2.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getAllCouNoAct(int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		List<Course> lstCourse = new ArrayList<Course>();
		Page<Course> page2 = courseRepository.getAllCouNoAct(paging);
		lstCourse = page2.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			courseDTO.setEmail(course.getUsers().getEmail());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public Course AcceptCour(Course course) {
		Optional<Course> optional = courseRepository.findById(course.getId());
		if (optional.isPresent()) {
			Course cour = optional.get();
			cour.setStatus(course.getStatus());
			courseRepository.save(cour);

		}
		return course;
	}

//	@Override
//	public List<CourseDTO> getCourseByAuthor(Integer author_id) {
//		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
//		List<Course> lstCourse = courseRepository.findAll();
//		for (Course course : lstCourse) {
//			if(course.getAuthor().getId() == author_id) {
//				CourseDTO courseDTO = new CourseDTO();
//				BeanUtils.copyProperties(course, courseDTO);
//				courseDTO.setRate(IrateService.avgstar(course.getId()));
//				courseDTO.setAuthorName(course.getAuthor().getName());
//				courseDTO.setCategoryName(course.getCategory().getName());
//				lstCourseDTO.add(courseDTO);
//			}
//		}
//		return lstCourseDTO;
//	}

	@Override
	public List<CourseDTO> getCourseByAuthor(Integer author_id, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (author_id == 0) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.getCourseByAuthor(author_id, paging);
		listEnity = pageCourses.getContent();
		for (Course course : listEnity) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getPriceAsc(int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		List<Course> lstCourse = new ArrayList<Course>();
		Page<Course> page2 = courseRepository.getPriceAsc(paging);
		lstCourse = page2.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getPriceDesc(int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		List<Course> lstCourse = new ArrayList<Course>();
		Page<Course> page2 = courseRepository.getPriceDesc(paging);
		lstCourse = page2.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getPriceAscByCate(Integer categoryId, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (categoryId == 0) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.getPriceAscByCate(categoryId, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			dto.setRate(IrateService.avgstar(entity.getId()));
			dto.setImageAuthor(entity.getAuthor().getImage());
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getPriceDescByCate(Integer categoryId, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (categoryId == 0) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.getPriceDescByCate(categoryId, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			dto.setRate(IrateService.avgstar(entity.getId()));
			dto.setImageAuthor(entity.getAuthor().getImage());
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getRateAsc(int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		List<Course> lstCourse = new ArrayList<Course>();
		Page<Course> page2 = courseRepository.getRateAsc(paging);
		lstCourse = page2.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getRateDesc(int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		List<Course> lstCourse = new ArrayList<Course>();
		Page<Course> page2 = courseRepository.getRateDesc(paging);
		lstCourse = page2.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getRateAscByCate(Integer categoryId, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (categoryId == 0) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.getRateAscByCate(categoryId, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			dto.setRate(IrateService.avgstar(entity.getId()));
			dto.setImageAuthor(entity.getAuthor().getImage());
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getRateDescByCate(Integer categoryId, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (categoryId == 0) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.getRateDescByCate(categoryId, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			dto.setRate(IrateService.avgstar(entity.getId()));
			dto.setImageAuthor(entity.getAuthor().getImage());
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getPrice1(int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		List<Course> lstCourse = new ArrayList<Course>();
		Page<Course> page2 = courseRepository.getPrice1(paging);
		lstCourse = page2.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getPrice2(int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		List<Course> lstCourse = new ArrayList<Course>();
		Page<Course> page2 = courseRepository.getPrice2(paging);
		lstCourse = page2.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getPrice3(int page, int size) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		List<Course> lstCourse = new ArrayList<Course>();
		Page<Course> page2 = courseRepository.getPrice3(paging);
		lstCourse = page2.getContent();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setAuthorName(course.getAuthor().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getPrice1ByCate(Integer categoryId, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (categoryId == 0) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.getPrice1ByCate(categoryId, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			dto.setRate(IrateService.avgstar(entity.getId()));
			dto.setImageAuthor(entity.getAuthor().getImage());
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getPrice2ByCate(Integer categoryId, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (categoryId == 0) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.getPrice2ByCate(categoryId, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			dto.setRate(IrateService.avgstar(entity.getId()));
			dto.setImageAuthor(entity.getAuthor().getImage());
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getPrice3ByCate(Integer categoryId, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (categoryId == 0) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.getPrice3ByCate(categoryId, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			dto.setRate(IrateService.avgstar(entity.getId()));
			dto.setImageAuthor(entity.getAuthor().getImage());
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> findAllByCreateDate(String sort, int page, int size) {
		Sort sortable = null;
		if (sort.equals("ASC")) {
			sortable = Sort.by("create_date").ascending();
		}
		if (sort.equals("DESC")) {
			sortable = Sort.by("create_date").descending();
		}
		Pageable pageable = PageRequest.of(page, size, sortable);
		List<CourseDTO> dtos = new ArrayList<CourseDTO>();
		List<Course> entitys = courseRepository.findAllByCreateDate(pageable);
		for (Course entity : entitys) {
			CourseDTO dto = convertToDTO(entity);
			dtos.add(dto);
		}
		return dtos;
	}

}
