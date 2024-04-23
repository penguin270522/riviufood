package com.riviufood.riviu.dtos;

public class AuthenticationDTO {
    private String token;

    public AuthenticationDTO(String token) {
        this.token = token;
    }

    public String getToken(){
        return token;
    }
}
