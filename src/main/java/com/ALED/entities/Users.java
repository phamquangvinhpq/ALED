package com.ALED.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import lombok.Data;

@Data
@Entity(name = "users")
public class Users  {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Integer id;

    @Column(name = "username", unique = true, length = 20)
    private String username;
    private String address;

	private String email;

	private String image;

	private String name;

	private String password;

	private String phone;

	@OneToMany(mappedBy="users")
	private List<Cart> carts;
//
//	//bi-directional one-to-one association to Note
//	@OneToOne(mappedBy="user")
//	private Note note;
//
//	//bi-directional many-to-one association to Order
//	@OneToMany(mappedBy="user")
//	private List<Order> orders;
//
//	//bi-directional many-to-one association to Rate
//	@OneToMany(mappedBy="user")
//	private List<Rate> rates;
//
//	//bi-directional many-to-one association to UserCourse
//	@OneToMany(mappedBy="user")
//	private List<UserCourse> userCourses;


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
    
    @OneToMany(mappedBy="user")
	private List<Mycourse> mycourses;
    

    @OneToMany(mappedBy = "users")
    private List<Course> usCourses;
   

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