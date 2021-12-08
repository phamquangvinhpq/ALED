package com.ALED.config.security.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ALED.entities.UserRole;
import com.ALED.entities.Users;
import com.ALED.repositories.UserRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    	
    // Kiểm tra xem user có tồn tại trong database không?
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Username not found" + username);
        }
        List<UserRole> userRoles = user.getUserRole();
        List<GrantedAuthority> authorities = userRoles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole().getRoleName())).collect(Collectors.toList());
        CustomUserDetails customUserDetails = new CustomUserDetails(user.getId(), username, user.getPassword(), authorities,
                user.getIsEnable());
        return customUserDetails;
    }
    
    // lấy thông tin user từ ID 
    public UserDetails loadUserById(Integer id) throws UsernameNotFoundException {
        Optional<Users> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("Username not found" + id);
        }
        Users user = userOptional.get();
        List<UserRole> userRoles = user.getUserRole();
        List<GrantedAuthority> authorities = userRoles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole().getRoleName())).collect(Collectors.toList());
        CustomUserDetails customUserDetails = new CustomUserDetails(user.getId(), user.getUsername(), user.getPassword(), authorities,
                user.getIsEnable());
        return customUserDetails;
    }

}
