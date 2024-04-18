package com.riviufood.riviu.dtos;

import com.riviufood.riviu.enums.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    private Status status; // APPROVED, PENDING, REJECTED
    private String message; // if rejected
}
