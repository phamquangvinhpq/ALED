package com.ALED.service;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ALED.config.FileManager;

@Service
public class FileServiceImpl implements FileService {

	private FileManager fileManager = new FileManager();
	@Value("${image.path}")
	private String linkFolder;

//	final String resourcePath = "src/main/resources/static";
//	String resourceAbsPath = new FileSystemResource(resourcePath).getFile().getAbsolutePath();
//	private String linkFolder = resourceAbsPath;

	@Override
	public String uploadImage(MultipartFile image) throws IOException {

		String nameImage = new Date().getTime() + "." + fileManager.getFormatFile(image.getOriginalFilename());

		String path = linkFolder + "\\" + nameImage;

		fileManager.createNewMultiPartFile(path, image);
		return nameImage;
	}
	
	

	@Override
	public File path(String nameImage) throws IOException {

		String path = linkFolder + "\\" + nameImage;

		return new File(path);
	}

	
}
