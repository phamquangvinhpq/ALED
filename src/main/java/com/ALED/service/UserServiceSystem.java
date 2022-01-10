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

import com.ALED.DTO.AuthorSkillDTO;
import com.ALED.DTO.UserAuthorDTO;
import com.ALED.DTO.UserDTO;
import com.ALED.entities.Author;
import com.ALED.entities.Course;
import com.ALED.entities.Role;
import com.ALED.entities.UserRole;
import com.ALED.entities.Users;
import com.ALED.entities.author_skill;
import com.ALED.repositories.AuthorRepository;
import com.ALED.repositories.AuthorSkillRepository;
import com.ALED.repositories.CourseRepository;
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
	
	@Autowired
	private CourseRepository courseRepository;

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
	public String sendMail(UserAuthorDTO authorDTO) {

		SimpleMailMessage message = new SimpleMailMessage();

		message.setTo(authorDTO.getEmail());
		message.setSubject("Cung cấp thông tin");
		message.setText(authorDTO.getMail());

		// Send Message!
		emailSender.send(message);
		return "thành công";
	
	}
	
	@Override
	public String sendMailReport(UserAuthorDTO authorDTO,Integer id)  {

		List<Course> courses = courseRepository.timcoursbyuserid(id);
		for (Course course : courses) {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(authorDTO.getEmail());
			message.setSubject("Thông báo");
			message.setText("Khóa học " + course.getCourseName() + " của bạn đã vi phạm điều khoản của chúng tôi, xin vui lòng kiểm tra lại khóa học "
					+ "trong 2 ngày nếu không khóa học của bạn sẽ bị xóa. Xin cảm ơn");

			// Send Message!
			emailSender.send(message);
		
		}
			
		return "thành công";
		
		
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
		author.setPhoto(UserAuthorDTO.getImage2());
		author.setImage(UserAuthorDTO.getImage());
		author.setDescription(UserAuthorDTO.getDescription());
		author.setEducation(UserAuthorDTO.getEducation());
		author.setType(UserAuthorDTO.getType2());

		authorrepository.save(author);
		

		author_skill ausk = new author_skill();
		ausk.setId(author.getId());
		ausk.setAuthor(author);
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
	public List<AuthorSkillDTO> getkill(Integer id) {
		List<AuthorSkillDTO> list = new ArrayList<AuthorSkillDTO>();
		List<author_skill> ds = authorskillRepository.findByAuthorId(id);
		for (author_skill author_skill : ds) {
			AuthorSkillDTO authorSkillDTO = new AuthorSkillDTO();
			BeanUtils.copyProperties(author_skill, authorSkillDTO);
			authorSkillDTO.setAuthor_id(author_skill.getAuthor().getId());
			authorSkillDTO.setPhoto(author_skill.getAuthor().getPhoto());
			list.add(authorSkillDTO);
		}

		return list;
	}

	@Override
	public List<UserDTO> getAllStAndGv(Integer pageno, Integer pagesize) {
		List<Users> listEnity = new ArrayList<Users>();
		List<UserDTO> listDto = new ArrayList<UserDTO>();
		Pageable paging = PageRequest.of(pageno, pagesize);
		Page<Users> pageCourses = userRepository.getAllHsAndGv(paging);
		listEnity = pageCourses.getContent();
		for (Users entity : listEnity) {
			UserDTO dto = new UserDTO();
			BeanUtils.copyProperties(entity, dto);
			
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<UserDTO> getAllSt(Integer pageno, Integer pagesize) {
		List<Users> listEnity = new ArrayList<Users>();
		List<UserDTO> listDto = new ArrayList<UserDTO>();
		Pageable paging = PageRequest.of(pageno, pagesize);
		Page<Users> pageCourses = userRepository.getAllHs(paging);
		listEnity = pageCourses.getContent();
		for (Users entity : listEnity) {
			UserDTO dto = new UserDTO();
			BeanUtils.copyProperties(entity, dto);
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<UserDTO> getAllGV(Integer pageno, Integer pagesize) {
		List<Users> listEnity = new ArrayList<Users>();
		List<UserDTO> listDto = new ArrayList<UserDTO>();
		Pageable paging = PageRequest.of(pageno, pagesize);
		Page<Users> pageCourses = userRepository.getAllGV(paging);
		listEnity = pageCourses.getContent();
		for (Users entity : listEnity) {
			UserDTO dto = new UserDTO();
			BeanUtils.copyProperties(entity, dto);
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<UserDTO> getAllInsNoIsNable(Integer pageno, Integer pagesize) {
		List<Users> listEnity = new ArrayList<Users>();
		List<UserDTO> listDto = new ArrayList<UserDTO>();
		
		Pageable paging = PageRequest.of(pageno, pagesize);
		Page<Users> pageCourses = userRepository.getAllInsNoIsNable(paging);
		listEnity = pageCourses.getContent();
		for (Users entity : listEnity) {
			UserDTO dto = new UserDTO();
			BeanUtils.copyProperties(entity, dto);		
			listDto.add(dto);
		}
		return listDto;
	}
	
	 @Override
	public List<UserDTO> getAllInsNoIsNableByEmail(String email,Integer pageno, Integer pagesize) {
		List<Users> listEnity = new ArrayList<Users>();
		List<UserDTO> listDto = new ArrayList<UserDTO>();
		Pageable paging = PageRequest.of(pageno, pagesize);
		Page<Users> pageCourses;
		if(email == null) {
			pageCourses = userRepository.findAll(paging);
		}else {
			pageCourses =	userRepository.getAllInsNoIsNableByEmail(email,paging);
			listEnity = pageCourses.getContent();
			for (Users entity : listEnity) {
				UserDTO dto = new UserDTO();
				BeanUtils.copyProperties(entity, dto);		
				listDto.add(dto);
		}
		
		}
		return listDto;
	}
	 
	 @Override
	public List<UserDTO> getAllHsAndGvByEmail(String email,Integer pageno, Integer pagesize) {
			List<Users> listEnity = new ArrayList<Users>();
			List<UserDTO> listDto = new ArrayList<UserDTO>();
			Pageable paging = PageRequest.of(pageno, pagesize);
			Page<Users> pageCourses;
			if(email == null) {
				pageCourses = userRepository.findAll(paging);
			}else {
				pageCourses =	userRepository.getAllHsAndGvByEmail(email,paging);
				listEnity = pageCourses.getContent();
				for (Users entity : listEnity) {
					UserDTO dto = new UserDTO();
					BeanUtils.copyProperties(entity, dto);		
					listDto.add(dto);
			}
			
			}
			return listDto;
		}
	 
	 @Override
	public List<UserDTO> getAllGVByEmail(String email,Integer pageno, Integer pagesize) {
			List<Users> listEnity = new ArrayList<Users>();
			List<UserDTO> listDto = new ArrayList<UserDTO>();
			Pageable paging = PageRequest.of(pageno, pagesize);
			Page<Users> pageCourses;
			if(email == null) {
				pageCourses = userRepository.findAll(paging);
			}else {
				pageCourses =	userRepository.getAllGVByEmail(email,paging);
				listEnity = pageCourses.getContent();
				for (Users entity : listEnity) {
					UserDTO dto = new UserDTO();
					BeanUtils.copyProperties(entity, dto);		
					listDto.add(dto);
			}
			
			}
			return listDto;
		}
	 
	 @Override
	public List<UserDTO> getAllHsByEmail(String email,Integer pageno, Integer pagesize) {
			List<Users> listEnity = new ArrayList<Users>();
			List<UserDTO> listDto = new ArrayList<UserDTO>();
			Pageable paging = PageRequest.of(pageno, pagesize);
			Page<Users> pageCourses;
			if(email == null) {
				pageCourses = userRepository.findAll(paging);
			}else {
				pageCourses =	userRepository.getAllHsByEmail(email,paging);
				listEnity = pageCourses.getContent();
				for (Users entity : listEnity) {
					UserDTO dto = new UserDTO();
					BeanUtils.copyProperties(entity, dto);		
					listDto.add(dto);
			}
			
			}
			return listDto;
		}

}