package com.ALED.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Users;
import com.ALED.entities.author_skill;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

	@Query(value = "SELECT us FROM users us WHERE us.username = ?1 AND us.status = 1")
	Users findByUsername1(String username);

	@Query(value = "SELECT us FROM users us WHERE (?1 IS NULL OR us.username LIKE CONCAT('%', ?1, '%')) AND us.isEnable = true AND us.status = 1")
	Page<Users> pageUsersActive(String userName, Pageable pageable);

	@Query(value = "SELECT * FROM users WHERE image LIKE CONCAT('%',:image,'%')", nativeQuery = true)
	Users findByImage(@Param("image") String imageName);

	@Query(value = "Select Count(*) from users", nativeQuery = true)
	Integer countUser();

	@Query(value = "SELECT * FROM `users` LEFT JOIN `userrole` ON users.id = userrole.user_id\r\n"
			+ "where userrole.role_id = 3 AND is_enable = 1", nativeQuery = true)
	List<Users> getAllGV();

	@Query(value = "SELECT * FROM `users` LEFT JOIN `userrole` ON users.id = userrole.user_id\r\n"
			+ "where userrole.role_id = 2 AND is_enable = 1", nativeQuery = true)
	List<Users> getAllHs();

	@Query(value = "SELECT users.*,author_skill.skill FROM `users` LEFT JOIN `userrole` ON users.id = userrole.user_id JOIN author_skill ON users.id=author_skill.id where userrole.role_id = 3 AND is_enable = 0", nativeQuery = true)
	List<Users> getAllInsNoIsNable();

	@Query(value = "SELECT * FROM `users` LEFT JOIN `userrole` ON users.id = userrole.user_id\r\n"
			+ "where userrole.role_id IN (2,3) AND is_enable = 1", nativeQuery = true)
	List<Users> getAllHsAndGv();

	@Modifying
	@Transactional
	@Query(value = "UPDATE users us SET us.status = 0 WHERE us.id IN ?1")
	void deleteLsUser(List<Integer> lsId);

	@Query(value = "select * from users where users.email =:email", nativeQuery = true)
	Users findByEmail(@Param("email") String email);

	@Query(value = " SELECT * FROM `author_skill` WHERE id=:id", nativeQuery = true)
	List<author_skill> findBySkill(@Param("id") Integer id);

	  Optional<Users> findByUsername(String username);
}
