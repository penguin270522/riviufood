package com.riviufood.riviu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("demo")
public class PostController {

    @GetMapping
    public ResponseEntity<String> demo(){
        return  ResponseEntity.ok("con chim non");
    }
}
