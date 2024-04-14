package com.riviufood.riviu.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EvaluteDTO {
    private Long locationId;
    private Integer overall;

    private Integer cleanLiness;

    private Integer flavor;

    private Integer space;

    private Integer price;

    private Integer service;
}
