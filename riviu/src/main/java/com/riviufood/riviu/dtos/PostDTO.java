package com.riviufood.riviu.dtos;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter //lambok tao getter tu dong
@Setter //tao setter tu dong
@Builder
@AllArgsConstructor // tao constructor voi tat ca tham so
@NoArgsConstructor // tao constructor voi ko tham so
public class PostDTO {

    private String title;
    private String content;
    private List<MultipartFile> files;
    private String userId;
    private String createBy;
}
