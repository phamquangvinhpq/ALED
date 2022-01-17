package com.ALED.controller;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.lowagie.text.pdf.BaseFont;

@RestController
@RequestMapping("/Pdf")
public class TaoPDFController {

	@Autowired
	private TemplateEngine templateEngine;
	@Value("${server.url}")
	private String serverUrl;

	@Value("${server.proto}")
	private String serverProto;
	@Value("${image.path}")
	private String linkFolder;

	@GetMapping("/ngay")
	public void layngay() {
		Date date = new Date();
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		int year = localDate.getYear();
		int month = localDate.getMonthValue();
		int day = localDate.getDayOfMonth();

		System.out.println(day + ":" + month + ":" + year);
	}
	

	@GetMapping("/xuat")
	public RedirectView xuat(HttpServletResponse response, @RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "tenkh", required = false) String tenkh,@RequestParam("machungchi") String machungchi) throws Exception {
		Date date = new Date();
		LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		int year = localDate.getYear();
		int month = localDate.getMonthValue();
		int day = localDate.getDayOfMonth();
		String fullngay = day + "/" +"0"+ month + "/" + year;
		String fullngay1 = "Hà Nội, ngày " + day + " tháng " + "0" + month + " năm " + year;
		String namehoa=name.toUpperCase();
		Map<String, String> data = new HashMap<String, String>();
		data.put("name", namehoa);
		data.put("tenkh", tenkh);
		data.put("machungchi", machungchi);
		data.put("ngayfull", fullngay);
		data.put("ngayfull1", fullngay1);
		Assert.notNull("thymeleaf_template.html", "The templateName can not be null");
		Context ctx = new Context();
		if (data != null) {
			Iterator itMap = data.entrySet().iterator();
			while (itMap.hasNext()) {
				Map.Entry pair = (Map.Entry) itMap.next();
				ctx.setVariable(pair.getKey().toString(), pair.getValue());
			}
		}

		String processedHtml = templateEngine.process("thymeleaf_template.html", ctx);
		FileOutputStream os = null;
		String fileName = UUID.randomUUID().toString();
		try {
			String outputFolder = linkFolder + fileName + ".pdf";
			OutputStream outputStream = new FileOutputStream(outputFolder);
			ITextRenderer renderer = new ITextRenderer();
			renderer.getFontResolver().addFont(linkFolder + "ARIALUNI.TTF", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
			renderer.setDocumentFromString(processedHtml);

			renderer.layout();
			renderer.createPDF(outputStream);
			outputStream.close();

			RedirectView redirectView = new RedirectView();

			redirectView.setUrl(serverProto + "://" + serverUrl + "/Pdf/downloadFile/?name=" + fileName);

			return redirectView;

		} finally {
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
					/* ignore */ }
			}
		}
	}

	@RequestMapping(path = "/downloadFile", method = RequestMethod.GET)
	public ResponseEntity<InputStreamResource> downloadDocument(@RequestParam("name") String name,
			HttpServletResponse response) throws IOException {
		HttpHeaders responseHeader = new HttpHeaders();

		File file2Upload = new File(linkFolder + name + ".pdf");
		byte[] data = FileUtils.readFileToByteArray(file2Upload);
		// Set mimeType trả về
		responseHeader.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		// Thiết lập thông tin trả về
		responseHeader.set("Content-disposition", "attachment; filename=" + "ALED.pdf");
		responseHeader.setContentLength(data.length);
		InputStream inputStream = new BufferedInputStream(new ByteArrayInputStream(data));
		InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
		return new ResponseEntity<InputStreamResource>(inputStreamResource, responseHeader, HttpStatus.OK);
	}
}
