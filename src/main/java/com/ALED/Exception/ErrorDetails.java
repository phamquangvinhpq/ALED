package com.ALED.Exception;

import java.util.Date;

public class ErrorDetails {
	
	private Date timestamp;
	private String message;
	private String details;
	private String loicode;
	
	public ErrorDetails(Date timestamp, String message, String details,String loivalidate) {
		super();
	
		this.timestamp = timestamp;
		this.message = message;
		this.details = details;
		this.loicode=loivalidate;
	}
	
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
	public String getMessage() {
		return message;
	}
	public String getLoicode() {
		return loicode;
	}

	public void setLoicode(String loicode) {
		this.loicode = loicode;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
}