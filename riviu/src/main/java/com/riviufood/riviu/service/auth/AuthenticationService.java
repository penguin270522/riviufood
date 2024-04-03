package com.riviufood.riviu.service.auth;

import com.riviufood.riviu.dtos.AuthenticationDTO;
import com.riviufood.riviu.dtos.UserDto;
import com.riviufood.riviu.model.Collections;
import com.riviufood.riviu.model.Role;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.CollectionRepository;
import com.riviufood.riviu.repository.RoleRepository;
import com.riviufood.riviu.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service

public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    private final CollectionRepository collectionRepository;


    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 AuthenticationManager authenticationManager,
                                 RoleRepository roleRepository, CollectionRepository collectionRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.collectionRepository = collectionRepository;
    }

    public AuthenticationDTO register(UserDto request){
        User user = new User();
        Collections collections = new Collections();
        user.setUsername(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        Role role = roleRepository.findByCode("ROLE_USER");
        user.setRole(role);
        user.setEmail(request.getEmail());
        user = repository.save(user);
        collections.setUser(user);
        collectionRepository.save(collections);
        String token = jwtService.generateToken(user);

        return new AuthenticationDTO(token);
    }

    public AuthenticationDTO authenticate(UserDto request){
        User user = new User();
        user.setUsername(request.getName());
        user.setPassword(request.getPassword());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        user = repository.findByUsername(user.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);
        return new AuthenticationDTO(token) ;


    }

}
