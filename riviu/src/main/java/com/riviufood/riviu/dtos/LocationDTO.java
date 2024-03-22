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

    private String address;

    private String numberPhone;

    private Integer lowestPrince;

    private Integer highestPrince;

    private String openTime;
    private String closeTime;

}
