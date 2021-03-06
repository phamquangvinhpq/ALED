package com.ALED.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.entities.Author;
import com.ALED.entities.Course;
import com.ALED.entities.Report;
import com.ALED.entities.Users;
import com.ALED.repositories.AuthorRepository;
import com.ALED.repositories.AuthorSkillRepository;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.ReportRepository;
import com.ALED.repositories.UserRepository;
import com.ALED.service.FileService;
import com.ALED.service.VideoStreamService;

import reactor.core.publisher.Mono;



@RestController
@RequestMapping("/api")
public class FileController {

	@Autowired
	private FileService fileService;


	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired
	private VideoStreamService videoStreamService;
	
	@Autowired
	private ReportRepository reportRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthorRepository authorRepository;
	
	
	@GetMapping(value = "/file/image")
	public ResponseEntity<?> downloadImage(@RequestParam String videoName) throws IOException {
		Course type = courseRepository.findByImage(videoName);
		File imageFile = fileService.path(videoName);
		InputStreamResource imageStream = new InputStreamResource(new FileInputStream(imageFile));
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", videoName));
		headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		headers.add("Pragma", "no-cache");
		headers.add("Expires", "0");
	
		return ResponseEntity.ok().contentType(MediaType.valueOf(type.getType())).body(imageStream);
	}
	
	@GetMapping(value = "/file/imageuser")
	public ResponseEntity<?> downloadImage1(@RequestParam String videoName) throws IOException {
		Users type = userRepository.findByImage(videoName);
		File imageFile = fileService.path(videoName);
		InputStreamResource imageStream = new InputStreamResource(new FileInputStream(imageFile));
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", videoName));
		headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		headers.add("Pragma", "no-cache");
		headers.add("Expires", "0");
	
		return ResponseEntity.ok().contentType(MediaType.valueOf(type.getType())).body(imageStream);
	}
	
	@GetMapping(value = "/file/report")
	public ResponseEntity<?> downloadImageReport(@RequestParam String videoName) throws IOException {
		Report type = reportRepository.findByImage(videoName);
		File imageFile = fileService.path(videoName);
		InputStreamResource imageStream = new InputStreamResource(new FileInputStream(imageFile));
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", videoName));
		headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		headers.add("Pragma", "no-cache");
		headers.add("Expires", "0");
	
		return ResponseEntity.ok().contentType(MediaType.valueOf(type.getType())).body(imageStream);
	}
	
	@GetMapping(value = "/file/imageskill")
	public ResponseEntity<?> downloadImage2(@RequestParam String videoName) throws IOException {
		Author type = authorRepository.findByImage(videoName);
		File imageFile = fileService.path(videoName);
		InputStreamResource imageStream = new InputStreamResource(new FileInputStream(imageFile));
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", videoName));
		headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		headers.add("Pragma", "no-cache");
		headers.add("Expires", "0");
		return ResponseEntity.ok().contentType(MediaType.valueOf(type.getType())).body(imageStream);
	}
	
	
	
	@GetMapping(value = "/file/video",produces = "video/mp4")
	public Mono<ResponseEntity<byte[]>> downloadVideo(@RequestParam String videoName,  @RequestHeader(value = "Range", required = false) String httpRangeList) throws IOException {
		File video = fileService.path(videoName);
		return Mono.just(videoStreamService.prepareContent(video, videoName, httpRangeList));
	}



}
