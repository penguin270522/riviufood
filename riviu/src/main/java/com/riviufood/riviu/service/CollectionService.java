package com.riviufood.riviu.service;

import com.riviufood.riviu.exception.CollectionNotFoundException;
import com.riviufood.riviu.model.Collections;
import com.riviufood.riviu.repository.CollectionRepository;
import com.riviufood.riviu.service.parent.ICollection;
import org.springframework.stereotype.Service;

@Service
public class CollectionService implements ICollection {
    private final CollectionRepository collectionRepository;

    public CollectionService(CollectionRepository collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    @Override
    public Collections findById(Long id) {
        Collections collections = collectionRepository.findById(id).orElseThrow(
                ()-> new CollectionNotFoundException("Collection not found with id = " + id)
        );
        return collections;
    }
}
