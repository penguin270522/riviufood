package com.riviufood.riviu.dtos;

import com.riviufood.riviu.enums.Status;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationDTO {
    private Long id;

    private String name;
    private String numberPhone;
    private Integer lowestPrince;
    private Integer highestPrince;
    private String openTime;
    private String closeTime;
    private String address;
    private String watch_word;
    private Long locationFood_id;
    private Long area_id;
    private Status status;

}
