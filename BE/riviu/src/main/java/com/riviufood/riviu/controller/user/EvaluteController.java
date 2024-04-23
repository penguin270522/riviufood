package com.riviufood.riviu.controller.user;

import com.riviufood.riviu.dtos.EvaluteDTO;
import com.riviufood.riviu.model.Evalute;
import com.riviufood.riviu.service.EvaluteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/evalute")
@AllArgsConstructor
public class EvaluteController {
    private final EvaluteService evaluteService;
    @PostMapping("/{postId}")
    public ResponseEntity<Evalute> evaluteWithPostForCollection(@PathVariable Long postId, @RequestBody EvaluteDTO evaluteDTO) {
        Evalute evalute = null;
        try {
            evalute = evaluteService.saveEvalute(postId, evaluteDTO);
            return new ResponseEntity<>(evalute, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(evalute, HttpStatus.BAD_REQUEST);
        }
    }
}
