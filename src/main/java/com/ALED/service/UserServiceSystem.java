package com.ALED.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ALED.entities.Role;
import com.ALED.entities.UserRole;
import com.ALED.entities.Users;
import com.ALED.repositories.RoleRepository;
import com.ALED.repositories.UserRepository;
import com.ALED.repositories.UserRoleRepository;


@Service
public class UserServiceSystem implements IUserServiceSystem {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@Override
	public List<Users> readAll() {

		List<Users> entities = userRepository.findAll();

		return entities;
	}

	@Override
	public Users update(Users user) {
		Optional<Users> optional = userRepository.findById(user.getId());
		if (optional.isPresent()) {
			userRepository.save(user);
		}
		return user;
	}

	@Override
	public Users delete(Integer id) {
		Optional<Users> optional = userRepository.findById(id);
		if (optional.isPresent()) {

			userRepository.deleteById(id);
		}
		return optional.get();
	}

	@Override
	public Users detail(Integer id) {
		Optional<Users> optional = userRepository.findById(id);

		return optional.get();
	}

	@Override
	public List<Users> findpage(Integer pageno, Integer pagesize) {
		Pageable paging = PageRequest.of(pageno, pagesize);

		Page<Users> pagedResult = userRepository.findAll(paging);
		
	            return pagedResult.toList();
	}

	@Override
	public Users searchUser(String keyword) {
		Users user = userRepository.findByUsername(keyword);
		return user;
	}

	@Override
	public Users create(Users user) {
	    userRepository.save(user);	
		// save user role
		List<Role> inputRole = user.getRoles();
		
		List<UserRole> userRoles = inputRole.stream().map(e -> {
			UserRole userRole = new UserRole();
			
			Optional<Role> optional = roleRepository.findById(e.getId());
			if(optional.isPresent()) {
				userRole.setRole(optional.get());
			}
			userRole.setUser(user);
			return userRole; 
		}).collect(Collectors.toList());
		
		userRoleRepository.saveAll(userRoles);
		return user;
	}

	

}
