package com.riviufood.riviu.dtos;

import lombok.*;

@Getter //lambok tao getter tu dong
@Setter //tao setter tu dong
@Builder
@AllArgsConstructor // tao constructor voi tat ca tham so
@NoArgsConstructor // tao constructor voi ko tham so
public class PostResponse {
    private String title;
    private String content;
}
