package com.riviufood.riviu.exception;

public class CollectionNotFoundException extends RuntimeException{
    public CollectionNotFoundException(String erroMessage){
        super(erroMessage);
    }
}
