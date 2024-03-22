package com.riviufood.riviu.repository;

import com.riviufood.riviu.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    /*List<Comment> findBy*/
}
