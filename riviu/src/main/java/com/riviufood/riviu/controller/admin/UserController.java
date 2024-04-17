package com.riviufood.riviu.controller.admin;

import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.dtos.UserDto;
import com.riviufood.riviu.service.auth.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class UserController {

    public final UserService userService;
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUser(){
        List<UserDto> userDtoList = userService.getALlUser();
        return ResponseEntity.ok(userDtoList);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping
    public ResponseEntity<UserDto> getfindByUsername(@RequestBody UserDto userDto){
        UserDto userDto1 = userService.findbyUserName(userDto);
        return ResponseEntity.ok(userDto1);
    }


}
