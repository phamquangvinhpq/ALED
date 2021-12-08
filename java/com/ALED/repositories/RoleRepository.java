package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

	Role findByRoleName(String roleName);

	List<Role> findByIdNotIn(List<Integer> lsId);

}
