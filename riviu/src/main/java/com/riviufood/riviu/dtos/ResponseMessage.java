package com.riviufood.riviu.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseMessage {
    private String message;

    public static ResponseMessage success() {
        return new ResponseMessage("Successfully!");
    }
}
