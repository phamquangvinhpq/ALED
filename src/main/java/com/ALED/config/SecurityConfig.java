package com.ALED.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import com.ALED.config.security.jwt.JwtAuthenticationEntryPoint;
import com.ALED.config.security.jwt.JwtAuthenticationFilter;
import com.ALED.config.security.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	 @Bean
	  public ClassLoaderTemplateResolver emailTemplateResolver(){
	    ClassLoaderTemplateResolver emailTemplateResolver=new ClassLoaderTemplateResolver();
	    emailTemplateResolver.setPrefix("templates/");
	    emailTemplateResolver.setTemplateMode("HTML5");
	    emailTemplateResolver.setSuffix(".html");
	    emailTemplateResolver.setTemplateMode("XHTML");
	    emailTemplateResolver.setCharacterEncoding("UTF-8");
	    emailTemplateResolver.setOrder(1);
	    return emailTemplateResolver;
	  }

	 // Password encoder, để Spring Security sử dụng mã hóa mật khẩu người dùng
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
	


    @Autowired
    private CustomUserDetailsService detailsServiceCustom;

    // Thêm một  Filter kiểm tra jwt
    @Bean
    public JwtAuthenticationFilter getJWTAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(detailsServiceCustom) // Cung cấp userservice cho spring security
        .passwordEncoder(passwordEncoder()); // cung cấp password encoder
    }



    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(getJWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and().authorizeRequests()
                .antMatchers("/auth/**","/ca/**","/home","/**").permitAll().anyRequest() // Cho phép tất cả mọi người truy cập vào địa chỉ này
                .authenticated(); // Tất cả các request khác đều cần phải xác thực mới được truy cập
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000/", "http://localhost:8080", "http://34.126.92.217:8888","https://api-lms.hachinet.com/"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
