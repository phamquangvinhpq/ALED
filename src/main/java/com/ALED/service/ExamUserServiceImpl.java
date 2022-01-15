package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.Exam.TongdiemDTO;
import com.ALED.entities.Exam;
import com.ALED.entities.ExamUser;
import com.ALED.entities.Users;
import com.ALED.repositories.ExamRepository;
import com.ALED.repositories.ExamUserRepository;

@Service
public class ExamUserServiceImpl implements ExamUserService {
	private ExamUserRepository examUserRepository;
	private ExamRepository examRepository;
	@Autowired
	private EntityManager entityManager;

	@Autowired
	public ExamUserServiceImpl(ExamUserRepository examUserRepository, ExamRepository examRepository) {
		this.examUserRepository = examUserRepository;
		this.examRepository = examRepository;
	}

	@Override
	public void create(Exam exam, Users userSet, Integer courseid) {
		List<ExamUser> examUserList = new ArrayList<>();
		System.out.println("size: " + examUserList.size());

		ExamUser examUser = new ExamUser();
		examUser.setUser(userSet);
		examUser.setExam(exam);
		examUser.setCourse_id(courseid);
		examUser.setTotalPoint(0.0);
		examUserList.add(examUser);

		examUserRepository.saveAll(examUserList);

	}

	@Override
	public List<ExamUser> getExamListByUsername(String username) {
		return examUserRepository.findAllByUser_UsernameAndExam_Canceled(username, false);
	}

	@Override
	public ExamUser findByExamAndUser(Integer examId, String username) {
		return examUserRepository.findByExam_IdAndUser_Username(examId, username);
	}

	@Override
	public void update(ExamUser examUser) {
		examUserRepository.save(examUser);

	}

	@Override
	public Optional<ExamUser> findExamUserById(Integer id) {
		return examUserRepository.findById(id);
	}

	@Override
	public List<ExamUser> getCompleteExams(Integer courseId, String username) {
		List<ExamUser> examUserList = examUserRepository
				.findAllByExam_Section_Course_IdAndUser_UsernameAndTotalPointIsGreaterThan(courseId, username, -1.0);

		return examUserList;
	}

	@Override
	public List<ExamUser> findAllByExam_Id(Integer examId) {
		return examUserRepository.findAllByExam_Id(examId);
	}

	@Override
	public List<ExamUser> findExamUsersByIsFinishedIsTrueAndExam_Id(Integer examId) {
		return examUserRepository.findExamUsersByIsFinishedIsTrueAndExam_Id(examId);
	}

	@Override
	public List<TongdiemDTO> findAllBycourse(Integer userid,Integer courseid) {
		List<TongdiemDTO> tongdiemDTOs=new ArrayList<TongdiemDTO>();
	List<ExamUser> list=	examUserRepository.findAllByUser_UsernameAndCourse_id(userid,courseid);
		for (ExamUser examUser : list) {
			TongdiemDTO tongdiemDTO=new TongdiemDTO();
			tongdiemDTO.setDiem(examUser.getTotalPoint());
			tongdiemDTO.setName(examUser.getExam().getTitle());
			tongdiemDTOs.add(tongdiemDTO);
			
		}
		return tongdiemDTOs;
	}
}
