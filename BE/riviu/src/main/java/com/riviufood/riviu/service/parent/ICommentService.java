package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.CommentDTO;

public interface ICommentService {
    CommentDTO createComment(CommentDTO commentDTO, Long postId);
}
