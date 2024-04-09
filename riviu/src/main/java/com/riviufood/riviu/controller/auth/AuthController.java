package com.riviufood.riviu.controller.auth;

import com.riviufood.riviu.dtos.AuthenticationDTO;
import com.riviufood.riviu.dtos.UserDto;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.service.auth.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private  final AuthenticationService authService;

    public AuthController(AuthenticationService authService) {
        this.authService = authService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userRegisterDTO) {
        User response = authService.createUser(userRegisterDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody UserDto request
    ){
        AuthenticationDTO authenticationDTO = authService.login(request);
        return ResponseEntity.ok(authenticationDTO);
    }
}
