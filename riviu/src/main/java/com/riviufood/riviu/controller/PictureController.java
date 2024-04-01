package com.riviufood.riviu.controller;

import com.riviufood.riviu.components.PictureHandle;
import com.riviufood.riviu.dtos.PictureDTO;
import com.riviufood.riviu.model.Location;
import com.riviufood.riviu.model.Picture;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.service.LocationService;
import com.riviufood.riviu.service.PictureService;
import com.riviufood.riviu.service.PostsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/picture")
public class PictureController {
    private final PictureHandle pictureHandle;
    private final PostsService postService;

    private final PictureService pictureService;
    private final LocationService locationService;


    public PictureController(PictureHandle pictureHandle, PostsService postService, PictureService pictureService, LocationService locationService) {
        this.pictureHandle = pictureHandle;
        this.postService = postService;
        this.pictureService = pictureService;
        this.locationService = locationService;
    }

    @PostMapping(value = "/posts/uploads/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImagesPost(
            @PathVariable("id") Long postId,
            @ModelAttribute("files") List<MultipartFile> files) throws IOException {
        try{
            Post existingPost = postService.getPostById(postId);
            List<Picture> postPicture = new ArrayList<>();
            files = files == null ? new ArrayList<>() : files;
            for(MultipartFile file : files){
                pictureHandle.validateImageInput(file);
                String filename = pictureHandle.storeFile(file);
                Picture picture = pictureService.createPicturePost(
                        existingPost.getId(),
                        PictureDTO.builder()
                                .url(filename)
                                .post_id(existingPost.getId())
                                .build()
                );
                postPicture.add(picture);
            }
            return ResponseEntity.ok().body(postPicture);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(value = "/location/uploads/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImagesLocation(
            @PathVariable("id") Long locationId,
            @ModelAttribute("files") List<MultipartFile> files) throws IOException {
        try{
            Location existingLocation = locationService.findById(locationId);
            List<Picture> postPicture = new ArrayList<>();
            files = files == null ? new ArrayList<>() : files;
            for(MultipartFile file : files){
                pictureHandle.validateImageInput(file);
                String filename = pictureHandle.storeFile(file);
                Picture picture = pictureService.createPictureLocation(
                        existingLocation.getId(),
                        PictureDTO.builder()
                                .url(filename)
                                .location_id(existingLocation.getId())
                                .build()
                );
                postPicture.add(picture);
            }
            return ResponseEntity.ok().body(postPicture);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
