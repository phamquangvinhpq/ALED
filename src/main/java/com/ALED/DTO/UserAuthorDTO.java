package com.ALED.DTO;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.ALED.entities.Role;

import lombok.Data;

@Data
public class UserAuthorDTO {

    private Integer id;

	@NotNull
    private String username;
	@NotNull
    private String address;
	@NotNull
	@Email(message = "Email không hợp lệ")
	private String email;
	@NotNull
	private String image;
	@NotNull
	private String name;
	
	private String password;
	@NotNull
	private String phone;
	@NotNull
	private String Type;
	
    private Boolean isEnable;

    private Integer status;
    
    private String education;
    
    private List<Role> roles;
	@NotNull
    private String skill;

}
