package com.riviufood.riviu.converter;

import com.riviufood.riviu.dtos.AreaDTO;
import com.riviufood.riviu.dtos.PostDTO;
import com.riviufood.riviu.model.Area;
import com.riviufood.riviu.model.Post;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PostConverter {
    @Autowired
    private ModelMapper modelMapper;
    public PostDTO converEntityToDto (Post entity){
        PostDTO results = modelMapper.map(entity, PostDTO.class);
        return results;
    }

    public Post converDTOToEntity(PostDTO postDTO){
        Post post   = modelMapper.map(postDTO, Post.class);
        return post;
    }
}
