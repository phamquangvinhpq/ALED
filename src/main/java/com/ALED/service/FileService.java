package com.ALED.service;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	String uploadImage(MultipartFile image) throws IOException;

	File path(String nameImage) throws IOException;

}
