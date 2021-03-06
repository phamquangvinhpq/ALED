package com.ALED.controller;

import java.io.IOException;
import java.util.List;

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

import com.ALED.DTO.LessionDTO;
import com.ALED.Exception.ResourceNotFoundException;
import com.ALED.entities.Lession;
import com.ALED.service.FileService;
import com.ALED.service.LessionService;

@RestController
@RequestMapping("/lession")
public class LessionController {

	@Autowired
	private LessionService lessionService;

	@Value("${server.url}")
	private String serverUrl;

	@Value("${server.proto}")
	private String serverProto;

	@Autowired
	private FileService fileService;

	@GetMapping
	public List<LessionDTO> readAll() {
		return lessionService.readAll();
	}

	@PostMapping
	public LessionDTO create(@RequestBody @RequestParam(value = "file",required = false) MultipartFile file, LessionDTO lessionDTO)
			throws IOException {
		if (file != null) {
			lessionDTO.setLinkVideo(
					serverProto + "://" + serverUrl + "/api/file/video?videoName=" + fileService.uploadImage(file));
				lessionDTO.setType(file.getContentType());
		}
		else if(lessionDTO.getLinkVideo().equalsIgnoreCase("-1")) {
			throw new ResourceNotFoundException("loi");
			
		}
		else {
			
			lessionDTO.setLinkVideo(lessionDTO.getLinkVideo());
			lessionDTO.setType("test");
		}
		
		return lessionService.create(lessionDTO);

	}
	

	@DeleteMapping("/{id}")
	public LessionDTO delete(@PathVariable Integer id) {
		return lessionService.delete(id);
	}
	
	@DeleteMapping("/admin/{id}")
	public LessionDTO Admindelete(@PathVariable Integer id) {
		return lessionService.Admindelete(id);
	}

	
	@PutMapping
	public LessionDTO update(@RequestBody @RequestParam(name="file",required = false ) MultipartFile file, LessionDTO lessionDTO)
			throws IOException {
		if (file != null) {
			lessionDTO.setLinkVideo(
					serverProto + "://" + serverUrl + "/api/file/video?videoName=" + fileService.uploadImage(file));
				lessionDTO.setType(file.getContentType());
		}
		else {
			lessionDTO.setLinkVideo(lessionDTO.getLinkVideo());
			lessionDTO.setType(lessionDTO.getType());
		}

		return lessionService.update(lessionDTO);

	}

	@GetMapping("/{id}")
	public LessionDTO detail(@PathVariable Integer id) {
		return lessionService.detail(id);
	}
	
	@GetMapping("/find-all-by-section")
	public List<LessionDTO> findBySection(@RequestParam(name = "sectionId", required = false) Integer sectionId) {
		return lessionService.findAllBySection(sectionId);
	}
	
	
	@PutMapping("/updateStaus")
	public Lession updateStaus(@RequestBody Lession les) {
		return lessionService.updatestatus(les);
	}
	

	@PutMapping("/updateTime")
	public Lession updateTime(@RequestBody Lession les) {
		return lessionService.updateTime(les);
	}
	
	
	@GetMapping("/getlessionbytime")
	public Lession getlessionbytime(@RequestParam("course") Integer course) {
		return lessionService.getLessionbyTime(course);
	}
	

	@PutMapping("/updateXemThu")
	public boolean updateXemThu(@RequestParam(name = "id", required = false) Integer id,
			@RequestParam(name = "demo", required = false) Integer demo) {
		return lessionService.updateXemThu(id, demo);

	}
	
	

}
