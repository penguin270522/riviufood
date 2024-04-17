package com.riviufood.riviu.controller.user;

import com.riviufood.riviu.dtos.PostDTO;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.service.PostsService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostsController {
    private final PostsService postService;

    public PostsController(PostsService postService) {
        this.postService = postService;
    }


    @PostMapping("/{postId}")
    public ResponseEntity<?> createPost (
            @PathVariable long postId,
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
            Post post = postService.createPosts(postDTO, postId);;

            return ResponseEntity.ok().body(post);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id){
        postService.deletePost(id);
        return ResponseEntity.ok("delete success!");
    }

    @GetMapping
    public ResponseEntity<?> searchPostByTitle(@RequestParam String title){
        List<Post> post = postService.searchByTitle(title);
        return ResponseEntity.ok().body(post);
    }

    @GetMapping("/postall")
    public ResponseEntity<?> findByALl(){
        List<Post> post = postService.findByAll();
        return ResponseEntity.ok(post);
    }

}
