package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.model.CollectionPost;
import com.riviufood.riviu.model.Collections;

public interface ICollectionPostService {
    CollectionPost savePost(Long postId);

    CollectionPost deleteCollectionPost(Long postId);
}
