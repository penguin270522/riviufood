package com.riviufood.riviu.controller.user;

import com.riviufood.riviu.dtos.ReportDTO;
import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.service.parent.IReportService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/report")
public class ReportController {
    public final IReportService iReportService;
    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<ResponseMessage> reportPost(@RequestBody ReportDTO reportDTO){
        ResponseMessage results = iReportService.reportPost(reportDTO);
        return ResponseEntity.ok(results);
    }
}
