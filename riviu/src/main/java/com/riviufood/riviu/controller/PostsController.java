package com.riviufood.riviu.controller;

import com.riviufood.riviu.dtos.PictureDTO;
import com.riviufood.riviu.dtos.PostDTO;
import com.riviufood.riviu.model.Picture;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.service.PostsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/posts")
public class PostsController {
    private final PostsService postService;

    public PostsController(PostsService postService) {
        this.postService = postService;
    }


    @PostMapping("")
    public ResponseEntity<?> createPost (
            @RequestBody PostDTO postDTO,
            BindingResult result){
        try{
            if(result.hasErrors()){
                List<String> erroMessage = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(erroMessage);
            }
            Post post = postService.createPosts(postDTO);;
            return ResponseEntity.ok().body(post);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(value = "/uploads/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImages(
            @PathVariable("id") Long postId,
            @ModelAttribute("files") List<MultipartFile> files) throws IOException {
        try{
            Post existingPost = postService.getPostById(postId);
            files = files == null ? new ArrayList<>() : files;
            List<Picture> postPicture = new ArrayList<>();
            for(MultipartFile file : files){
                if(file.getSize() == 0){
                    continue;
                }
                // check kich thuong file va dinh dang
                if(file.getSize() > 10 * 1024 * 1024){
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body("file is too large! Maxmum size is 10MB");
                }
                String contentType = file.getContentType();
                if(contentType == null || !contentType.startsWith("image/")){
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body("file must be an image");
                }
                String filename = storeFile(file);
                Picture picture = postService.createPicture(
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

    private String storeFile(MultipartFile file) throws IOException {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        // Thêm UUID vào trước tên file để đảm bảo tên file là duy nhất
        String uniqueFilename = UUID.randomUUID().toString() + "_" + filename;
        // Đường dẫn đến thư mục mà bạn muốn lau file
        java.nio.file.Path uploadDir = Paths.get("uploads");
        // Kim tra và tạo thư mục nếu nó không tồn tại
        if (!Files.exists(uploadDir)) {
            Files.createDirectories (uploadDir);
        }
        // duong dan day du den file
        java.nio.file.Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
        // Sao chép file vào thư mục đích
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFilename;
    }


}
