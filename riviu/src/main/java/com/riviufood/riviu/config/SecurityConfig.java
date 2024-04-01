package com.riviufood.riviu.config;

import com.riviufood.riviu.filter.WebJwtAuthenticationFilter;
import com.riviufood.riviu.service.auth.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final UserService userDetailsServiceImp;
    private final WebJwtAuthenticationFilter jwtAuthenticationFilter;

    private  final CutomAccessDeniedHandler accessDeniedHandler;

    public SecurityConfig(UserService userDetailsServiceImp, WebJwtAuthenticationFilter jwtAuthenticationFilter, CutomAccessDeniedHandler accessDeniedHandler) {
        this.userDetailsServiceImp = userDetailsServiceImp;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.accessDeniedHandler = accessDeniedHandler;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req.requestMatchers("/api/auth/login/**", "/api/auth/register/**", "/location/all/**")
                                .permitAll()
                                .anyRequest().authenticated()
                )
                .userDetailsService(userDetailsServiceImp)
                /*.exceptionHandling(e -> e.accessDeniedHandler(accessDeniedHandler)
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))*/
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // Thay đổi ở đây
                .build();
    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
