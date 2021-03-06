package com.ALED.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity(name = "users")
public class Users  {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", unique = true, length = 20)
    private String username;
    private String address;

    @Column(name = "email", length = 20)
    @Email(message = "email không hợp lệ")
	private String email;

	private String image;

	private String name;

	private String password;

	private String phone;

	private String Type;
	


    private Boolean isEnable;
   
    private Integer status;
    
    
    
    @ManyToMany
    @JoinTable(
			name = "userrole",
			joinColumns = @JoinColumn(name = "userId"),
			inverseJoinColumns = @JoinColumn(name = "roleId")
			)
    private List<Role> roles;
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<UserRole> userRole;
    
//    @OneToMany(mappedBy="user")
//	private List<Mycourse> mycourses;
//    
//
    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private List<QA> qas;
    
    @OneToMany(mappedBy = "users")
    private List<Report> reports;
   

    public static enum Status {
        Delete(0), Active(1);
        private final Integer value;

        private Status(Integer value) {
            this.value = value;
        }

        public Integer value() {
            return this.value;
        }
    }
}