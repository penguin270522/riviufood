package com.riviufood.riviu.controller.auth;

import com.riviufood.riviu.dtos.AuthenticationDTO;
import com.riviufood.riviu.dtos.UserDto;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.service.auth.AuthenticationService;
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
    public ResponseEntity<AuthenticationDTO> register(
            @RequestBody UserDto request
    ){
        AuthenticationDTO authenticationDTO = authService.register(request);
        return ResponseEntity.ok(authenticationDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationDTO> login(
            @RequestBody UserDto request
    ){
        AuthenticationDTO authenticationDTO = authService.authenticate(request);
        return ResponseEntity.ok(authenticationDTO);
    }
}
