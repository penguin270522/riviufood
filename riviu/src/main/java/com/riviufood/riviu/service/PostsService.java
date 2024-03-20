package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.PostResponse;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.PostRepository;
import com.riviufood.riviu.repository.UserRepository;
import com.riviufood.riviu.service.auth.ProfileService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class PostsService {
    private final PostRepository response;
    private final UserRepository userRepository;

    public PostsService(PostRepository response, UserRepository userRepository, ProfileService profileService) {
        this.response = response;
        this.userRepository = userRepository;

    }


    public void savePost(PostResponse postResponse) {
        User user = ProfileService.getLoggedInUser();
        Post post = new Post();
        post.setTitle(postResponse.getTitle());
        post.setContent(postResponse.getContent());
        post.setUser(user);
        post.setCreatedDate(new Date());
        response.save(post);
    }


}
