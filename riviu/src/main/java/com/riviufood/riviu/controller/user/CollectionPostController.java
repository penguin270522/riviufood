package com.riviufood.riviu.controller.user;

import com.riviufood.riviu.model.CollectionPost;
import com.riviufood.riviu.service.CollectionPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/collection")
public class CollectionPostController {

    private final CollectionPostService collectionPostService;

    public CollectionPostController(CollectionPostService collectionPostService) {
        this.collectionPostService = collectionPostService;
    }


    @PostMapping("/{postId}")
    public ResponseEntity<CollectionPost> saveCollectionPost(@PathVariable Long postId){
        CollectionPost collectionPost = collectionPostService.savePost(postId);
        return ResponseEntity.ok(collectionPost);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> removePostColecction(@PathVariable Long postId){
        collectionPostService.deleteCollectionPost(postId);
        return ResponseEntity.ok("success!");
    }


}
