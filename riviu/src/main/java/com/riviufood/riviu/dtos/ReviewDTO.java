package com.riviufood.riviu.dtos;

import com.riviufood.riviu.enums.StatusLocation;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    private StatusLocation statusLocation; // APPROVED, PENDING, REJECTED
    private String message; // if rejected
}
