package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.model.CollectionPost;
import com.riviufood.riviu.model.Collections;

public interface ICollectionPostService {
    ResponseMessage savePost(Long postId);

    ResponseMessage saveLocation(Long locationId);

    CollectionPost deleteCollectionPost(Long postId);
}
