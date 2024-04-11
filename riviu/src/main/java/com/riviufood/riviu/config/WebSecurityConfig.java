package com.riviufood.riviu.config;

import com.riviufood.riviu.components.JwtTokenUtil;
import com.riviufood.riviu.filter.WebJwtAuthenticationFilter;
import com.riviufood.riviu.service.auth.UserService;
import jakarta.websocket.Endpoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebSecurity(debug = false) // SecurityFilterChain,..
@EnableMethodSecurity // @PreAuthorize, @PostAuthorize, @PreFilter ...
@EnableWebMvc
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final UserService userDetailsServiceImp;
    private final WebJwtAuthenticationFilter jwtAuthenticationFilter;
    private  final CutomAccessDeniedHandler accessDeniedHandler;


 /*   @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(customCors -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowCredentials(true);
                    corsConfiguration.addAllowedOriginPattern("*"); // Sử dụng allowedOriginPatterns thay vì allowedOrigins
                    corsConfiguration.addAllowedMethod("*");
                    corsConfiguration.addAllowedHeader("*");
                    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                    source.registerCorsConfiguration("/**", corsConfiguration);
                    customCors.configurationSource(source);
                })
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req.requestMatchers( "/api/auth/login/**",
                                                    "/api/auth/register/**",
                                                    "/location/all/**",
                                                    "location/**",
                                                    "picture/location/"
                                        )
                                .permitAll()
                                .anyRequest().authenticated()
                )
                .userDetailsService(userDetailsServiceImp)
                *//*.exceptionHandling(e -> e.accessDeniedHandler(accessDeniedHandler)
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))*//*
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // Thay đổi ở đây
                .build();
    }*/


 /*   @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }*/


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(request -> {
                    request
                            .requestMatchers(
                                    "api/auth/login",
                                    "api/auth/register",
                                    "posts/postall",
                                    "location/all"
                            )
                            .permitAll()
                            /*.requestMatchers(HttpMethod.POST,"posts").hasRole("ADMIN")*/
                            .anyRequest().authenticated();
                })
                .csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }
}
