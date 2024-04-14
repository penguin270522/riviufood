package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.CommentDTO;
import com.riviufood.riviu.model.Comment;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.CommentRepository;
import com.riviufood.riviu.repository.PostRepository;
import com.riviufood.riviu.service.auth.ProfileService;
import com.riviufood.riviu.service.parent.ICommentService;
import org.springframework.stereotype.Service;

@Service
public class CommentService implements ICommentService {
    private final PostRepository postRepository;
    private final PostsService postsService;
    private final ProfileService profileService;
    private final CommentRepository commentRepository;

    public CommentService(PostRepository postRepository, PostsService postsService, ProfileService profileService, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.postsService = postsService;
        this.profileService = profileService;
        this.commentRepository = commentRepository;
    }

    @Override
    public CommentDTO createComment(CommentDTO commentDTO, Long postId) {
        Comment comment = new Comment();
        Post post = postsService.getPostById(postId);
        User user = ProfileService.getLoggedInUser();
        comment.setComment(commentDTO.getComment());
        comment.setPost(post);
        comment.setUser(user);
        commentRepository.save(comment);
        return commentDTO;
    }
}
