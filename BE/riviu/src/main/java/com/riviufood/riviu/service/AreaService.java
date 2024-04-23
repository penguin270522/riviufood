package com.riviufood.riviu.service;

import com.riviufood.riviu.converter.AreaConverter;
import com.riviufood.riviu.converter.BaseConverter;
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
    private final BaseConverter baseConverter;

    public AreaService(AreaRepository areaRepository, AreaConverter areaConverter, BaseConverter baseConverter) {
        this.areaRepository = areaRepository;
        this.areaConverter = areaConverter;
        this.baseConverter = baseConverter;
    }

    @Override
    public List<Area> findByAll() {
        return areaRepository.findAll();
    }

    @Override
    public Area createArea(AreaDTO areaDTO) {
        Area area = baseConverter.convertDtoToEntity(areaDTO, Area.class);
        area.setCreatedDate(new Date());
        return areaRepository.save(area);
    }

    @Override
    public Area findById(Long id) {
        Area area = areaRepository.findById(id).orElseThrow();
        return area;
    }
}
