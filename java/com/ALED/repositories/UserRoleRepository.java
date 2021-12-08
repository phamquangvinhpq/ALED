package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Role;
import com.ALED.entities.UserRole;
import com.ALED.entities.UserRoleId;
import com.ALED.entities.Users;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {

    UserRole findByRoleAndUser(Role role, Users users);

    List<UserRole> findByRoleInAndUser(List<Role> lsRole, Users users);

}
