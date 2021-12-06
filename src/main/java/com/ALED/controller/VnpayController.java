package com.ALED.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.CourseDTO;
import com.ALED.DTO.MycourseDTO;
import com.ALED.DTO.OrderDTO;
import com.ALED.DTO.PayDTO;
import com.ALED.entities.Course;
import com.ALED.enums.confvpn;
import com.ALED.repositories.UserRepository;
import com.ALED.service.MycourseService;
import com.ALED.service.OrderService;

@RestController
public class VnpayController {
	@Autowired
	OrderService orderService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	ServletContext context;

	@Autowired
	private MycourseService mycourseService;

	@PostMapping("/Thanhtoan/Course")
	public String thanhtoan(@RequestBody PayDTO payDTO, HttpSession session) throws UnsupportedEncodingException {
		int amount = (int) (payDTO.getPrice() * 100);
		String uniqueID = UUID.randomUUID().toString();
		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", confvpn.vnp_Version);
		vnp_Params.put("vnp_Command", confvpn.vnp_Command);
		vnp_Params.put("vnp_Amount", String.valueOf(amount));
		vnp_Params.put("vnp_TmnCode", confvpn.vnp_TmnCode);
		vnp_Params.put("vnp_TxnRef", uniqueID);
		vnp_Params.put("vnp_OrderInfo", payDTO.getDescription());
		vnp_Params.put("vnp_OrderType", confvpn.vnp_OrderType);
		vnp_Params.put("vnp_IpAddr", confvpn.vnp_IpAddr);
		vnp_Params.put("vnp_Locale", confvpn.vnp_Locale);
		vnp_Params.put("vnp_CurrCode", confvpn.vnp_CurrCode);
		vnp_Params.put("vnp_BankCode", payDTO.getBankcode());
		vnp_Params.put("vnp_Returnurl", confvpn.vnp_Returnurl);

		context.setAttribute("user_id", payDTO.getUser_id());
		
	context.setAttribute("course", payDTO.getCourse_id());
	

	

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnp_CreateDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
		// Build data to hash and querystring
		List fieldNames = new ArrayList(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator itr = fieldNames.iterator();

		while (itr.hasNext()) {
			String fieldName = (String) itr.next();
			String fieldValue = (String) vnp_Params.get(fieldName);
			if ((fieldValue != null) && (fieldValue.length() > 0)) {
				// Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
				// Build query
				query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
				query.append('=');
				query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = confvpn.hmacSHA512(confvpn.vnp_HashSecret, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		String paymentUrl = confvpn.vnp_PayUrl + "?" + queryUrl;

		return paymentUrl;
	}

	@GetMapping("/ketquathanhtoan")
	public String ketquathanhtoan(@RequestParam(value = "vnp_Amount", required = false) int gia,
			@RequestParam(value = "vnp_BankCode", required = false) String nganhang,
			@RequestParam(value = "vnp_OrderInfo", required = false) String mota,
			@RequestParam(value = "vnp_PayDate", required = false) String ngaytao,
			@RequestParam(value = "vnp_ResponseCode", required = false) int trangthai) throws ParseException {

		Date date = new SimpleDateFormat("yyyyMMddHHmmss").parse(ngaytao);
		OrderDTO order = new OrderDTO();
		order.setBank(nganhang);
		order.setCreateDate(date);
		order.setMonny(gia);
		order.setMota(mota);
		order.setStatus(trangthai);
		order.setUser((int) context.getAttribute("user_id"));
		orderService.create(order);

		if (trangthai == 00) {
			MycourseDTO mycourseDTO = new MycourseDTO();
			mycourseDTO.setCourse((int) context.getAttribute("course"));
			mycourseDTO.setUsers((int) context.getAttribute("user_id"));
			mycourseService.create(mycourseDTO);
			return "thành công";
		}

		return "chưa thanh toán";
	}

}
