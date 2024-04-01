package com.riviufood.riviu.dtos;

import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationDTO {

    private String name;
    private String numberPhone;
    private Long lowestPrince;
    private Long highestPrince;
    private String openTime;
    private String closeTime;
    private String address;


}
