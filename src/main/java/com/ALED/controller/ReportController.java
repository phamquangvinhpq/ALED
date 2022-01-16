package com.ALED.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ALED.DTO.ReportDTO;
import com.ALED.service.FileService;
import com.ALED.service.IReportService;

@RestController
@RequestMapping("/report")
public class ReportController {

	@Value("${server.url}")
	private String serverUrl;

	@Value("${server.proto}")
	private String serverProto;

	@Autowired
	private FileService fileService;

	@Autowired
	private IReportService iReportService;

	@GetMapping
	public List<ReportDTO> getAll(@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "5") Integer size) {
		return iReportService.getAllDtos(page, size);
	}
	
	@GetMapping("/getByStatus")
	public List<ReportDTO> getAllByStatus(@RequestParam(value = "status", required = false) Integer status, 
			@RequestParam(defaultValue = "0") Integer page,@RequestParam(defaultValue = "5") Integer size) {
		return iReportService.getByStatus(status, page, size);
	}
	
	@PostMapping("/guiMail")
	public void voidguiMail(@RequestParam(value = "email", required = false) String email, @RequestParam(defaultValue = "") String loiNhan,
			 @RequestParam(defaultValue = "") Integer id) {
		iReportService.guiMail(email, loiNhan, id);
	}

	@PostMapping
	public ReportDTO create(@RequestBody @RequestParam(value = "file", required = false) MultipartFile file,
			ReportDTO dto) throws IOException {
		if (file != null) {
			String type = file.getContentType();
			if (type.contains("image")) {
				dto.setLinkVideo(
						serverProto + "://" + serverUrl + "/api/file/report?videoName=" + fileService.uploadImage(file));
				dto.setType(type);
			}
			else if (type.contains("video/mp4")) {
				dto.setLinkVideo(
						serverProto + "://" + serverUrl + "/api/file/video?videoName=" + fileService.uploadImage(file));
				dto.setType(type);
			}
			else {
				throw new RuntimeException("Chỉ được chọn tệp ảnh hoặc tệp video có định dạng MP4");
			}
		}
		else {
			dto.setLinkVideo("0");
			dto.setType("0");
		}
		return iReportService.create(dto);

	}
}
