package com.riviufood.riviu.service.auth;

import com.riviufood.riviu.components.JwtTokenUtil;
import com.riviufood.riviu.dtos.AuthenticationDTO;
import com.riviufood.riviu.dtos.UserDto;
import com.riviufood.riviu.model.Collections;
import com.riviufood.riviu.model.Role;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.CollectionRepository;
import com.riviufood.riviu.repository.RoleRepository;
import com.riviufood.riviu.repository.UserRepository;
import com.riviufood.riviu.service.parent.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IUserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final CollectionRepository collectionRepository;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;



 /*   public AuthenticationDTO register(UserDto request){
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
        user.setCollections(collections);
        repository.save(user);
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
        return new AuthenticationDTO(token);
    }*/


    @Override
    public User createUser(UserDto userDto) {
        String username = userDto.getName();
        Collections collections = new Collections();
        Role role = roleRepository.findByCode("ROLE_USER");
        User newUser = User.builder()
                .username(username)
                .firstName("")
                .lastName("")
                .email(userDto.getEmail())
                .role(role)
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build();

        newUser = userRepository.save(newUser);
        collections.setUser(newUser);
        collectionRepository.save(collections);
        newUser.setCollections(collections);
        return userRepository.save(newUser);
    }


    @Override
    public AuthenticationDTO login(UserDto userDto) {
        Optional<User> optionalUser = userRepository.findByUsername(userDto.getName());
        if(optionalUser.isEmpty()){
            throw new UsernameNotFoundException("username errors");
        }
        User existingUser = optionalUser.get();
        //check pass
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDto.getName(), userDto.getPassword(),existingUser.getAuthorities()
        );
        authenticationManager.authenticate(authenticationToken);
        String token = jwtTokenUtil.generateToken(existingUser);
        return new AuthenticationDTO(token);
    }
}
