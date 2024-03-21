package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.PictureDTO;
import com.riviufood.riviu.dtos.PostDTO;
import com.riviufood.riviu.exception.DataNotFoundException;
import com.riviufood.riviu.model.Picture;
import com.riviufood.riviu.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public interface IPostsService {
    void savePost(PostDTO postDTO);
    Post createPosts(PostDTO postDTO);
    Post getPostById(Long postId) throws DataNotFoundException;
    Page<Post> getAllPost(PageRequest pageRequest);
    Post updatePost(Long id, PostDTO postDTO);
    void deletePost(long id);

    boolean existsByTitle(String title);
    Picture createPicture(Long postId, PictureDTO pictureDTO);
}
