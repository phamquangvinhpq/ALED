package com.ALED.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

    @Query(value = "SELECT us FROM users us WHERE us.username = ?1 AND us.status = 1")
    Users findByUsername(String username);

    @Query(value = "SELECT us FROM users us WHERE (?1 IS NULL OR us.username LIKE CONCAT('%', ?1, '%')) AND us.isEnable = true AND us.status = 1")
    Page<Users> pageUsersActive(String userName, Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users us SET us.status = 0 WHERE us.id IN ?1")
    void deleteLsUser(List<Integer> lsId);
}