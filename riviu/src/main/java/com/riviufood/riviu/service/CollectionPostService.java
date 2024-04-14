package com.riviufood.riviu.service;

import com.riviufood.riviu.model.CollectionPost;
import com.riviufood.riviu.model.Collections;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.CollecionPostRepository;
import com.riviufood.riviu.repository.CollectionRepository;
import com.riviufood.riviu.service.auth.ProfileService;
import com.riviufood.riviu.service.parent.ICollectionPostService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionPostService implements ICollectionPostService {
    private final CollecionPostRepository collectionPost;
    private final PostsService postsService;

    private final CollectionService collectionService;

    private final CollectionRepository collectionRepository;


    public CollectionPostService(CollecionPostRepository collectionPost, PostsService postsService, CollectionService collectionService, CollectionRepository collectionRepository) {
        this.collectionPost = collectionPost;
        this.postsService = postsService;
        this.collectionService = collectionService;
        this.collectionRepository = collectionRepository;
    }


    @Override
    public CollectionPost savePost(Long postId) {
        try {
            Post post = postsService.getPostById(postId);
            User user = ProfileService.getLoggedInUser();
            CollectionPost collectionPost1 = new CollectionPost();
            collectionPost1.setPost(post);
            collectionPost1.setCollections(user.getCollections());
            collectionPost.save(collectionPost1);
            return collectionPost1;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public CollectionPost deleteCollectionPost(Long postId) {
        User user = ProfileService.getLoggedInUser();
        Collections collections = user.getCollections();
        if(collections != null){
            for(CollectionPost collectionPost1 : collections.getPost()){
                if(collectionPost1.getPost().getId().equals(postId)){
                    collectionPost.delete(collectionPost1);
                    return collectionPost1;
                }
            }
        }
        return null;
    }
}
