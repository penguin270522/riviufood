package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.PictureDTO;
import com.riviufood.riviu.model.Picture;
import org.springframework.stereotype.Service;

@Service
public interface IPicture {

    Picture createPicturePost(Long postId, PictureDTO pictureDTO);

    Picture createPictureLocation(Long locationId, PictureDTO pictureDTO);

}
