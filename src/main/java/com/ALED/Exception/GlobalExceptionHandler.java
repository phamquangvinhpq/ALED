package com.ALED.Exception;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

	// handling specific exception
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> resourceNotFoundHandling(ResourceNotFoundException exception, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false),
				"-1");
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

	// handling global exception

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> globalExceptionHandling(Exception exception, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false),
				"-1");
		return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> validate(MethodArgumentNotValidException exception, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(),
				exception.getBindingResult().getFieldError().getDefaultMessage(), request.getDescription(false), "-1");
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}

	
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> ValidateParametersException(ConstraintViolationException exception) {
        ErrorDetails errorDetails =
                new ErrorDetails(new Date(), "not valid due to validation error: ", exception.getMessage(),"-1");
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    

    
   

}