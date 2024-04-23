package com.riviufood.riviu.repository;

import com.riviufood.riviu.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    boolean existsByTitle(String title);

    Page<Post> findAll(Pageable pageable);
    @Query("SELECT u FROM Post u WHERE u.title LIKE %?1%")
    List<Post> searchByTitle(String title);
}
