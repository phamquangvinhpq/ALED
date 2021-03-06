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

	 // Password encoder, ????? Spring Security s??? d???ng m?? h??a m???t kh???u ng?????i d??ng
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
	


    @Autowired
    private CustomUserDetailsService detailsServiceCustom;

    // Th??m m???t  Filter ki???m tra jwt
    @Bean
    public JwtAuthenticationFilter getJWTAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(detailsServiceCustom) // Cung c???p userservice cho spring security
        .passwordEncoder(passwordEncoder()); // cung c???p password encoder
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
                .antMatchers("/auth/**","/ca/**","/home","/**").permitAll().anyRequest() // Cho ph??p t???t c??? m???i ng?????i truy c???p v??o ?????a ch??? n??y
                .authenticated(); // T???t c??? c??c request kh??c ?????u c???n ph???i x??c th???c m???i ???????c truy c???p
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
