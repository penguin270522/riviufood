package com.riviufood.riviu.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationFoodDTO {
    private long id;
    private String name;
    private String value;
    private Integer countLocation;
}

