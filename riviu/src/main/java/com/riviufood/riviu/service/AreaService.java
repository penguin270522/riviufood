package com.riviufood.riviu.service;

import com.riviufood.riviu.converter.AreaConverter;
import com.riviufood.riviu.dtos.AreaDTO;
import com.riviufood.riviu.model.Area;
import com.riviufood.riviu.repository.AreaRepository;
import com.riviufood.riviu.service.parent.IAreaService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AreaService implements IAreaService {
    private final AreaRepository areaRepository;
    private final AreaConverter areaConverter;

    public AreaService(AreaRepository areaRepository, AreaConverter areaConverter) {
        this.areaRepository = areaRepository;
        this.areaConverter = areaConverter;
    }

    @Override
    public List<Area> findByAll() {
        return areaRepository.findAll();
    }

    @Override
    public Area createArea(AreaDTO areaDTO) {
        Area area = areaConverter.converDTOToEntity(areaDTO);
        area.setCreatedDate(new Date());
        return areaRepository.save(area);
    }
}
