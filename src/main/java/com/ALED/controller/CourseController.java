package com.ALED.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ALED.DTO.CourseDTO;
import com.ALED.entities.Course;
import com.ALED.repositories.CourseRepository;
import com.ALED.service.FileService;
import com.ALED.service.ICourseService;

@RestController
@RequestMapping("/course")
public class CourseController {

	@Autowired
	ICourseService courseService;
	
	@Autowired
	CourseRepository courseRepository;

	@Value("${server.url}")
	private String serverUrl;

	@Value("${server.proto}")
	private String serverProto;

	@Autowired
	private FileService fileService;

	@GetMapping("/cour-act")
	public List<CourseDTO> getAllCouAct() {
		return courseService.getAllCouAct();
	}
	
	@GetMapping("/cour-no-act")
	public List<CourseDTO> getAllCouNoAct() {
		return courseService.getAllCouNoAct();
	}
	
	@GetMapping("")
	public List<CourseDTO> getAll() {
		return courseService.readAll();
	}

	@GetMapping("/count")
	public Integer count() {
		return courseRepository.countCour();
	}

	@PutMapping("/edit")
	public CourseDTO edit(@RequestBody @RequestParam(name="file", required = false) MultipartFile file, CourseDTO courseDTO)
			throws IOException {
		
		if (file.getContentType() != null) {
			courseDTO.setImage(
					serverProto + "://" + serverUrl + "/api/file/image?videoName=" + fileService.uploadImage(file));

			courseDTO.setType(file.getContentType());
		}else {
			courseDTO.setImage(courseDTO.getImage());
			courseDTO.setType("image/jpeg");
		}

		return courseService.update(courseDTO);
	}

	
	@PostMapping("/save")
	public CourseDTO save(@Valid @RequestBody @RequestParam(name="file", required = false) MultipartFile file, CourseDTO courseDTO)
			throws IOException {
		if (file.getContentType() != null) {
			courseDTO.setImage(
					serverProto + "://" + serverUrl + "/api/file/image?videoName=" + fileService.uploadImage(file));
			courseDTO.setType(file.getContentType());
		}

		return courseService.save(courseDTO);
	}

	@DeleteMapping("/delete/{id}")
	public CourseDTO delete(@PathVariable Integer id) {
		return courseService.delete(id);
	}

	@GetMapping("/{id}")
	public List<CourseDTO> getById(@PathVariable Integer id) {
		return courseService.detail(id);
	}

	@GetMapping("user/{id}")
	public List<CourseDTO> getByUser(@PathVariable Integer id) {
		return courseService.detailus(id);
	}

	@GetMapping("get-all-by-name")
	public List<CourseDTO> getAllByName(@RequestParam(required = false) String courseName,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
		return courseService.getAllByName(courseName, page, size);
	}

	@GetMapping("get-all-by-page")
	public List<CourseDTO> getAllByNameAndUser(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "3") int size) {
		return courseService.getAll(page, size);
	}

	@GetMapping("get-all-by-category")
	public List<CourseDTO> getAllByCategory(@RequestParam(required = false) Integer categoryId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
		return courseService.getAllByCategory(categoryId, page, size);
	}

	@GetMapping("get-all-by-user")
	public List<CourseDTO> getAllByPage(@RequestParam(required = false) Integer usersId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
		return courseService.findpage(usersId, page, size);
	}
	
	@PutMapping("/accept")
	public Course setNEnable(@RequestBody Course vo) {
		return courseService.AcceptCour(vo);
	}
}
