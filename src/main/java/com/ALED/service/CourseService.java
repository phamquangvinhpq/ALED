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

	@Override
	public List<CourseDTO> readAll() {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		List<Course> lstCourse = courseRepository.findAll();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setUserName(course.getUsers().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			courseDTO.setAuthorName(course.getAuthor().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public CourseDTO save(CourseDTO author) {
		Course course = new Course();
		BeanUtils.copyProperties(author, course);
		course.setCategory(categoryRepository.getById(author.getCategory_id()));
		course.setAuthor(authorRepository.getById(author.getAuthor_id()));
		course.setUsers(userRepository.getById(author.getUser_id()));
		
		courseRepository.save(course);
		author.setId(course.getId());
		return author;
	}

	@Override
	public CourseDTO update(CourseDTO author) {
		Optional<Course> optional = courseRepository.findById(author.getId());
		if (optional.isPresent()) {
			Course course = optional.get();
			BeanUtils.copyProperties(author, course);

			course.setCategory(categoryRepository.getById(author.getCategory_id()));
			
			courseRepository.save(course);
		}
		return author;
	}

	@Override
	public CourseDTO delete(Integer id) {
		CourseDTO section = new CourseDTO();
		Optional<Course> optional = courseRepository.findById(id);
		if (optional.isPresent()) {
			Course entity = optional.get();
			BeanUtils.copyProperties(entity, section);
			courseRepository.delete(entity);
		}
		return section;
	}

	@Override
	public List<CourseDTO> detail(Integer id) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		List<Course> optional = courseRepository.timcoursbyid(id);
		
		for (Course course : optional) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			courseDTO.setUserName(course.getUsers().getName());
			courseDTO.setCategoryName(course.getCategory().getName());
			courseDTO.setAuthorName(course.getAuthor().getName());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}
	

	
	@Override
	public List<CourseDTO> findpage(Integer userId,int page, int size) {
		List<Course> courses = new ArrayList<Course>();
		List<CourseDTO> courseDTOs = new ArrayList<CourseDTO>();
		Pageable pageable = PageRequest.of(page, size);
		Page<Course> paging;
		if(userId == null) {
			paging = courseRepository.findAll(pageable);
		}else {
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
	public List<CourseDTO> detailus(Integer id,int page,int size) {
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
	public List<CourseDTO> getAll(int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses = courseRepository.findAll(paging);
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
	public List<CourseDTO> buythemost() {
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		List<Integer> list = courseRepository.buyTheMost();
		for (Integer integer : list) {
			CourseDTO dto = new CourseDTO();
			Course entity = courseRepository.getById(integer);
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			dto.setRate(IrateService.avgstar(entity.getId()));
			dto.setImage(entity.getImage());
			dto.setUserName(entity.getUsers().getUsername());
			dto.setCategoryName(entity.getCategory().getName());
			dto.setAuthorName(entity.getAuthor().getName());
			dto.setImageAuthor(entity.getAuthor().getImage());
			dto.setCountChapter(courseRepository.countChapter(entity.getId()));
			listDto.add(dto);
		}
		return listDto;
	}
	
	@Override
	public List<CourseDTO> getAllCouAct(int page, int size){
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
	public List<CourseDTO> getAllCouNoAct(int page, int size){
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
}
