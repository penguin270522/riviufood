package com.riviufood.riviu.controller.admin;

import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.model.TagReport;
import com.riviufood.riviu.service.parent.ITagRepositoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tag")
public class TagReportController {
    private final ITagRepositoryService tagRepositoryService;
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ResponseMessage> createTag(@RequestBody TagReport tagReport){
        ResponseMessage results = tagRepositoryService.creatTagReport(tagReport);
        return ResponseEntity.ok(results);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ResponseMessage> deletaTagReponse(@PathVariable long id){
        ResponseMessage results = tagRepositoryService.deleteTagReport(id);
        return ResponseEntity.ok(results);
    }
}
