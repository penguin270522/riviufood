package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.model.TagReport;
import com.riviufood.riviu.repository.TagReportRepository;
import com.riviufood.riviu.service.parent.ITagRepositoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TagReportService implements ITagRepositoryService {
    private final TagReportRepository tagReportRepository;

    @Override
    public TagReport findById(Long id) {
        TagReport tagReport = tagReportRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("dont find by id with id = " + id)
        );
        return tagReport;
    }

    @Override
    public ResponseMessage creatTagReport(TagReport tagReport) {
        try{
            tagReportRepository.save(tagReport);
            return ResponseMessage.success();
        }catch (Exception e){
            return ResponseMessage.baderror();
        }
    }



    @Override
    public ResponseMessage deleteTagReport(Long id) {
        try {
            TagReport tagReport = findById(id);
            return ResponseMessage.success();
        }catch (Exception e){
            return ResponseMessage.baderror();
        }
    }
}
