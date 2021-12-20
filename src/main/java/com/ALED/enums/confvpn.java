package com.ALED.enums;

import java.nio.charset.StandardCharsets;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;

public class confvpn {
	@Value("${server.url}")
	private static String serverUrl;

	@Value("${server.proto}")
	private static String serverProto;

	public static String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
	public static String vnp_Version = "2.1.0";
	public static String vnp_Command = "pay";
	public static String vnp_IpAddr	 = "192.168.1.1";
	public static String vnp_CurrCode = "VND";
	public static String vnp_Locale	 = "vn";
	public static String vnp_OrderType = "190000";
	public static String vnp_Returnurl ="https://sos.hachinet.com/ketquathanhtoan";
	public static String vnp_TmnCode = "NVHFCH2G";
	public static String vnp_HashSecret = "DOGXCXKJNQQLWYHVPCOWOOFZPPKKVSCA";
    public static String vnp_apiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/merchant.html";


	
    public static String hmacSHA512(final String key, final String data) {
        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }
}
