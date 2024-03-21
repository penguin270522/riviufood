package com.riviufood.riviu.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Getter //lambok tao getter tu dong
@Setter //tao setter tu dong
@Builder
@AllArgsConstructor // tao constructor voi tat ca tham so
@NoArgsConstructor // tao constructor voi ko tham so
public class PictureDTO {
    @JsonProperty("post_id")

    private Long post_id;

    @JsonProperty("url")
    private String url;

}
