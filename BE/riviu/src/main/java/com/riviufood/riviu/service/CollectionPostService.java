package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.model.*;
import com.riviufood.riviu.repository.CollecionPostRepository;
import com.riviufood.riviu.repository.CollectionRepository;
import com.riviufood.riviu.repository.LocationRepository;
import com.riviufood.riviu.service.auth.ProfileService;
import com.riviufood.riviu.service.parent.ICollectionPostService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CollectionPostService implements ICollectionPostService {

    private final CollecionPostRepository collectionPost;
    private final PostsService postsService;
    private final CollectionService collectionService;
    private final CollectionRepository collectionRepository;
    private final LocationService locationService;








    @Override
    public ResponseMessage savePost(Long postId) {
        try {
            Post post = postsService.getPostById(postId);
            User user = ProfileService.getLoggedInUser();
            CollectionPost collectionPost1 = new CollectionPost();
            collectionPost1.setPost(post);
            collectionPost1.setCollections(user.getCollections());
            collectionPost.save(collectionPost1);
            return ResponseMessage.success();
        }catch (Exception e){
           return ResponseMessage.baderror();
        }
    }

    @Override
    public ResponseMessage saveLocation(Long locationId) {
        try {
            Location location = locationService.findById(locationId);
            User user = ProfileService.getLoggedInUser();
            CollectionPost collectionPost1 = new CollectionPost();
            collectionPost1.setLocation(location);
            collectionPost1.setCollections(user.getCollections());
            collectionPost.save(collectionPost1);
            return ResponseMessage.success();
        }catch (Exception e){
            return ResponseMessage.baderror();
        }
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
