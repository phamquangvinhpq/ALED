package com.ALED.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
	public List<CourseDTO> getAllCouAct(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "10") Integer size) {
		return courseService.getAllCouAct(page,size);
	}

	@GetMapping("/cour-no-act")
	public List<CourseDTO> getAllCouNoAct(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "10") Integer size) {
		return courseService.getAllCouNoAct(page,size);
	}

	@GetMapping("")
	public List<CourseDTO> getAll() {
		return courseService.readAll();
	}
	
	@GetMapping("/get-page")
	public List<CourseDTO> getAllByPage(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "5") int size) {
		return courseService.getAll(page,size);
	}

	@GetMapping("/count")
	public Integer count() {
		return courseRepository.countCour();
	}

	@PutMapping("/edit")
	public CourseDTO edit( @Valid @RequestParam(name = "file", required = false) MultipartFile file, CourseDTO couDto)
			throws IOException {

		if (file != null) {
			couDto.setImage(
					serverProto + "://" + serverUrl + "/api/file/image?videoName=" + fileService.uploadImage(file));
			
			couDto.setType(file.getContentType());
		} else {

			couDto.setImage(couDto.getImage());
			couDto.setType("image/jpeg");
		}

		return courseService.update(couDto);
	}

	@GetMapping("buythemost")
	public List<CourseDTO> buythemost() {
		return courseService.buythemost();
	}

	@PostMapping("/save")
	public CourseDTO save(@Valid @RequestParam(name = "file", required = false) MultipartFile file,
			CourseDTO courseDTO) throws IOException {
		if (file != null) {
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
	public List<CourseDTO> getByUser(@PathVariable Integer id,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		return courseService.detailus(id,page,size);
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

	@GetMapping("/get_course_author")
	public List<CourseDTO> getCourseByAuthor(@RequestParam(required = true) Integer author_id,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "4") int size) {
		return courseService.getCourseByAuthor(author_id, page, size);
	}
	
	@GetMapping("/price-asc")
	public List<CourseDTO> getPriceAsc(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "3") Integer size) {
		return courseService.getPriceAsc(page,size);
	}
	
	@GetMapping("/price-desc")
	public List<CourseDTO> getPriceDesc(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "3") Integer size) {
		return courseService.getPriceDesc(page,size);
	}
	
	@GetMapping("/rate-asc")
	public List<CourseDTO> getRateAsc(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "3") Integer size) {
		return courseService.getRateAsc(page,size);
	}
	
	@GetMapping("/rate-desc")
	public List<CourseDTO> getRateDesc(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "3") Integer size) {
		return courseService.getRateDesc(page,size);
	}
	
	@GetMapping("get-price-asc-by-category")
	public List<CourseDTO> getPriceAscByCate(@RequestParam(required = false) Integer categoryId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
		return courseService.getPriceAscByCate(categoryId, page, size);
	}
	
	@GetMapping("get-price-desc-by-category")
	public List<CourseDTO> getPriceDescByCate(@RequestParam(required = false) Integer categoryId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
		return courseService.getPriceDescByCate(categoryId, page, size);
	}
	
	@GetMapping("get-rate-asc-by-category")
	public List<CourseDTO> getRateAscByCate(@RequestParam(required = false) Integer categoryId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
		return courseService.getRateAscByCate(categoryId, page, size);
	}
	
	@GetMapping("get-rate-desc-by-category")
	public List<CourseDTO> getRateDescByCate(@RequestParam(required = false) Integer categoryId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
		return courseService.getRateDescByCate(categoryId, page, size);
	}
	
	@GetMapping("get-price-1-by-category")
	public List<CourseDTO> getPrice1ByCate(@RequestParam(required = false) Integer categoryId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
		return courseService.getPrice1ByCate(categoryId, page, size);
	}
	
	@GetMapping("get-price-2-by-category")
	public List<CourseDTO> getPrice2ByCate(@RequestParam(required = false) Integer categoryId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
		return courseService.getPrice2ByCate(categoryId, page, size);
	}
	
	@GetMapping("get-price-3-by-category")
	public List<CourseDTO> getPrice3ByCate(@RequestParam(required = false) Integer categoryId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
		return courseService.getPrice3ByCate(categoryId, page, size);
	}
	
	@GetMapping("/price-1")
	public List<CourseDTO> getPrice1(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "3") Integer size) {
		return courseService.getPrice1(page,size);
	}
	
	@GetMapping("/price-2")
	public List<CourseDTO> getPrice2(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "3") Integer size) {
		return courseService.getPrice2(page,size);
	}
	
	@GetMapping("/price-3")
	public List<CourseDTO> getPrice3(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "3") Integer size) {
		return courseService.getPrice3(page,size);
	}
	
}
