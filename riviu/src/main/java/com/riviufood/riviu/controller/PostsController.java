package com.riviufood.riviu.controller;

import com.riviufood.riviu.dtos.PostResponse;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.service.PostsService;
import com.riviufood.riviu.service.UserSevice;
import com.riviufood.riviu.service.auth.AuthenticationService;
import com.riviufood.riviu.service.auth.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/posts")
public class PostsController {
    private final PostsService postService;

    public PostsController(PostsService postService) {
        this.postService = postService;
    }


    @PostMapping
    public void savePost(@RequestBody PostResponse postResponse){
        postService.savePost(postResponse);
    }
}
