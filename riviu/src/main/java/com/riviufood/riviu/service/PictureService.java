package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.PictureDTO;
import com.riviufood.riviu.exception.DataNotFoundException;
import com.riviufood.riviu.exception.InvalidParamExcaption;
import com.riviufood.riviu.model.Location;
import com.riviufood.riviu.model.Picture;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.repository.LocationRepository;
import com.riviufood.riviu.repository.PictureRepository;
import com.riviufood.riviu.repository.PostRepository;
import com.riviufood.riviu.service.parent.IPicture;
import org.springframework.stereotype.Service;

@Service
public class PictureService implements IPicture {

    private final PostRepository postRepository;
    private final PictureRepository pictureRepository;

    private final LocationRepository locationRepository;

    public PictureService(PostRepository postRepository, PictureRepository pictureRepository, LocationRepository locationRepository) {
        this.postRepository = postRepository;
        this.pictureRepository = pictureRepository;
        this.locationRepository = locationRepository;
    }

    @Override
    public Picture createPicturePost(Long postId, PictureDTO pictureDTO) {
        Post existingPost = postRepository.findById(pictureDTO.getPost_id())
                .orElseThrow(() -> new DataNotFoundException("cannot find post with id = " + pictureDTO.getPost_id())
                );
        Picture picture = Picture.builder()
                .post(existingPost)
                .url(pictureDTO.getUrl())
                .build();
        // cannt insert 5 picture for post
        int size = pictureRepository.findByPostId(postId).size();
        if(size >= 5){
            throw new InvalidParamExcaption("cannot insert 5 img for post");
        }
        return pictureRepository.save(picture);
    }

    @Override
    public Picture createPictureLocation(Long locationId, PictureDTO pictureDTO) {
        Location existingLocation = locationRepository.findById(pictureDTO.getLocation_id())
                .orElseThrow(() -> new DataNotFoundException("cannot find location with id = " + pictureDTO.getLocation_id())
                );
        Picture picture = Picture.builder()
                .location(existingLocation)
                .url(pictureDTO.getUrl())
                .build();
        // cannt insert 5 picture for post
        int size = pictureRepository.findByPostId(locationId).size();
        if(size >= 5){
            throw new InvalidParamExcaption("cannot insert 5 img for post");
        }
        return pictureRepository.save(picture);
    }
}
