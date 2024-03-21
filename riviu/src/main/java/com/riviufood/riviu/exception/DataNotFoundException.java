package com.riviufood.riviu.exception;

public class DataNotFoundException extends RuntimeException {
    public DataNotFoundException(String erroMessage){
        super(erroMessage);
    }
}
