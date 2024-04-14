package com.riviufood.riviu.controller;

import com.riviufood.riviu.dtos.CommentDTO;
import com.riviufood.riviu.model.Comment;
import com.riviufood.riviu.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(("/api/comment"))
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{postId}")
    public CommentDTO creatcomment(@RequestBody CommentDTO commentDTO,
                                   @PathVariable Long postId){
        return commentService.createComment(commentDTO,postId);
    }

}
