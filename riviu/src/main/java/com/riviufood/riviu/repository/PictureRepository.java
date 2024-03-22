package com.riviufood.riviu.repository;

import com.riviufood.riviu.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PictureRepository extends JpaRepository<Picture, Long> {
    List<Picture> findByPostId(long postId);
}
