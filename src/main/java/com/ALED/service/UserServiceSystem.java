package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ALED.DTO.UserAuthorDTO;
import com.ALED.entities.Author;
import com.ALED.entities.Role;
import com.ALED.entities.UserRole;
import com.ALED.entities.Users;
import com.ALED.entities.author_skill;
import com.ALED.repositories.AuthorRepository;
import com.ALED.repositories.AuthorSkillRepository;
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

	@Autowired
	private AuthorRepository authorrepository;

	@Autowired
	private AuthorSkillRepository authorskillRepository;

	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	@Autowired
	public JavaMailSender emailSender;

	@Autowired
	private PasswordEncoder check;

	@Override
	public List<Users> readAll() {

		List<Users> entities = userRepository.findAll();

		return entities;
	}

	@Override
	public Users update(Users user) {
		Optional<Users> entity = userRepository.findById(user.getId());
		if (entity.isPresent()) {
			Users us = entity.get();
			us.setAddress(user.getAddress());
			us.setName(user.getName());
			us.setPhone(user.getPhone());
			userRepository.save(us);
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

		double randomDouble = Math.random();
		randomDouble = randomDouble * 1000000 + 1;
		int randomInt = (int) randomDouble;

		String newPassword = String.valueOf(randomInt);
		user.setPassword(passwordEncoder.encode(newPassword));

		userRepository.save(user);

		// save user role
		List<Role> inputRole = user.getRoles();
		List<UserRole> userRoles = inputRole.stream().map(e -> {
			UserRole userRole = new UserRole();
			Optional<Role> optional = roleRepository.findById(e.getId());
			if (optional.isPresent()) {
				userRole.setRole(optional.get());
			}
			userRole.setUser(user);
			return userRole;
		}).collect(Collectors.toList());

		userRoleRepository.saveAll(userRoles);

		SimpleMailMessage message = new SimpleMailMessage();

		message.setTo(user.getEmail());
		message.setSubject("REGISTER AN ACCOUNT ALED");
		message.setText("Thank you for trusting and choosing ALED as a place to learn knowledge.\r\n"
				+ "We will bring you the useful courses you are looking for and maybe you will like other courses too\r\n"
				+ "Here is your password:"+newPassword +"\r\n"
				+ "Hope you won't mind changing your password\r\n"
				+ "Wish you have a great experience with our website");

		// Send Message!
		emailSender.send(message);

		return user;
	}

	@Override
	public String forgotpassword(Users users) throws MessagingException {
		Users user = userRepository.findByEmail(users.getEmail());
		if (user != null) {
			double randomDouble = Math.random();
			randomDouble = randomDouble * 1000000 + 1;
			int randomInt = (int) randomDouble;

			String newPassword = String.valueOf(randomInt);
			user.setPassword(passwordEncoder.encode(newPassword));
			userRepository.save(user);

			SimpleMailMessage message = new SimpleMailMessage();

			message.setTo(user.getEmail());
			message.setSubject("Reset Password ALED");
			message.setText("We hope you had a pleasant experience on our website.\r\n"
					+ "Don't worry if you don't remember your password. This is a common problem for everyone:\r\n"
					+ "Your new password will be:"+newPassword);

			// Send Message!
			emailSender.send(message);

			return "thành công";
		} else {
			return "email không tồn tại";

		}

	}

	@Override

	public UserAuthorDTO createAuthor(UserAuthorDTO UserAuthorDTO) {
		double randomDouble = Math.random();
		randomDouble = randomDouble * 1000000 + 1;
		int randomInt = (int) randomDouble;
		
		String newPassword = String.valueOf(randomInt);
		UserAuthorDTO.setPassword(passwordEncoder.encode(newPassword));
		
		Users us = new Users();
		BeanUtils.copyProperties(UserAuthorDTO, us);
		userRepository.save(us);
		Author author = new Author();

		author.setId(us.getId());
		author.setName(UserAuthorDTO.getName());
		author.setImage(UserAuthorDTO.getImage());
		author.setDescription(UserAuthorDTO.getEmail());
		author.setEducation(UserAuthorDTO.getEducation());

		authorrepository.save(author);

		author_skill ausk = new author_skill();
		ausk.setId(author.getId());
		ausk.setAuthor_id(author.getId());
		ausk.setSkill(UserAuthorDTO.getSkill());

		authorskillRepository.save(ausk);
		

		// save user role
		List<Role> inputRole = UserAuthorDTO.getRoles();
		List<UserRole> userRoles = inputRole.stream().map(e -> {
			UserRole userRole = new UserRole();
			Optional<Role> optional = roleRepository.findById(e.getId());
			if (optional.isPresent()) {
				userRole.setRole(optional.get());
			}
			userRole.setUser(us);
			return userRole;
		}).collect(Collectors.toList());

		userRoleRepository.saveAll(userRoles);

		SimpleMailMessage message = new SimpleMailMessage();

		message.setTo(UserAuthorDTO.getEmail());
		message.setSubject("REGISTER AN ACCOUNT ALED");
		message.setText("Thank you for trusting and choosing ALED as a place to learn knowledge.\r\n"
				+ "We will bring you the useful courses you are looking for and maybe you will like other courses too\r\n"
				+ "Here is your password:"+newPassword +"\r\n"
				+ "Hope you won't mind changing your password\r\n"
				+ "Wish you have a great experience with our website");

		// Send Message!
		emailSender.send(message);

		return UserAuthorDTO;
	}

	@Override
	public List<Users> getAllGV() {
		List<Users> list = userRepository.getAllGV();
		return list;
	}

	@Override
	public List<Users> getAllSt() {
		List<Users> list = userRepository.getAllHs();
		return list;
	}

	@Override
	public List<Users> getAllStAndGv() {
		List<Users> list = userRepository.getAllHsAndGv();
		return list;
	}

	@Override
	public List<Users> getAllInsNoIsNable() {
		List<Users> list = userRepository.getAllInsNoIsNable();
		return list;
	}

	public boolean changePassword(Users user, String newPassword) {
		Optional<Users> optional = userRepository.findById(user.getId());
		Users entity = optional.get();
		if (user.getPassword() == null || newPassword == null || user.getPassword().isEmpty()
				|| newPassword.isEmpty()) {
			return false;
		}
		boolean match = check.matches(user.getPassword(), entity.getPassword());
		if (!match) {
			return false;
		}
		entity.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(entity);
		return true;
	}

	@Override
	public Users updateStatus(Users user) {
		Optional<Users> optional = userRepository.findById(user.getId());
		if (optional.isPresent()) {
			Users us = optional.get();
			if (user.getStatus() == 1) {
				us.setStatus(0);
			} else {
				us.setStatus(1);
			}
			userRepository.save(us);

		}
		return user;
	}

	@Override
	public Users updateIsEnable(Users user) {
		Optional<Users> optional = userRepository.findById(user.getId());
		if (optional.isPresent()) {
			Users us = optional.get();
			us.setIsEnable(user.getIsEnable());
			userRepository.save(us);

		}
		return user;
	}

	@Override
	public List<author_skill> getkill(Integer id) {
		List<author_skill> ds = new ArrayList<author_skill>();
		Optional<author_skill> list = authorskillRepository.findById(id);
		if (list.isPresent()) {
			author_skill ask = list.get();
			ds.add(ask);
		}

		return ds;
	}

}