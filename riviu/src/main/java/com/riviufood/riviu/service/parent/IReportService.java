package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.ReportDTO;
import com.riviufood.riviu.dtos.ResponseMessage;

public interface IReportService {
    ResponseMessage reportPost(ReportDTO reportDTO);
}
