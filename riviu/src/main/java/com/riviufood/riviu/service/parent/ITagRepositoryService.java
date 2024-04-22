package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.model.TagReport;

public interface ITagRepositoryService {

    TagReport findById(Long id);
    ResponseMessage creatTagReport(TagReport tagReport);

    ResponseMessage deleteTagReport(Long id);
}
