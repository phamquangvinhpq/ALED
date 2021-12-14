package com.ALED.DTO;

import java.util.List;

import com.ALED.entities.Role;

import lombok.Data;

@Data
public class UserAuthorDTO {

    private Integer id;


    private String username;
    private String address;

	private String email;

	private String image;

	private String name;

	private String password;

	private String phone;

    private Boolean isEnable;
   
    private Integer status;
    

    private List<Role> roles;
    
    private String skill;

}
