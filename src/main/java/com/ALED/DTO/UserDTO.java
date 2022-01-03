package com.ALED.DTO;

import lombok.Data;

@Data
public class UserDTO {

    private Integer id;
    private String username;
    private String address;
    private String email;

	private String image;

	private String name;

	private String password;

	private String phone;

	private String Type;

    private Boolean isEnable;
   
    private Integer status;
    
	private Integer role;
}
