package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.EvaluteDTO;
import com.riviufood.riviu.model.Evalute;

public interface IEvaluteService {
    Evalute saveEvalute(Long postId, EvaluteDTO evaluteDTO);
}
