package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.ReportDTO;
import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.model.Post;
import com.riviufood.riviu.model.Report;
import com.riviufood.riviu.model.TagReport;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.ReportRepository;
import com.riviufood.riviu.service.auth.ProfileService;
import com.riviufood.riviu.service.parent.IReportService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReportService implements IReportService {
    private final ReportRepository reportRepository;
    private final PostsService postsService;
    private final TagReportService tagReportService;
    @Override
    public ResponseMessage reportPost(ReportDTO reportDTO) {
        try {
            Post post = postsService.getPostById(reportDTO.getPostId());
            TagReport tagReport = tagReportService.findById(reportDTO.getTagReportId());
            User user = ProfileService.getLoggedInUser();
            Report report = new Report();
            report.setPost(post);
            report.setTagReport(tagReport);
            report.setUser(user);
            report.setReporting_reason(reportDTO.getMessage());
            reportRepository.save(report);
            return ResponseMessage.success();
        }catch (Exception e){
            return ResponseMessage.baderror();
        }


    }


}
