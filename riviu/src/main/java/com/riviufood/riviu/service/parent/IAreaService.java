package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.AreaDTO;
import com.riviufood.riviu.model.Area;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IAreaService {
    List<Area> findByAll();
    Area createArea(AreaDTO areaDTO);
}
