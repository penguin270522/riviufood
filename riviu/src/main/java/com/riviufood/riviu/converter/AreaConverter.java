package com.riviufood.riviu.converter;

import com.riviufood.riviu.dtos.AreaDTO;
import com.riviufood.riviu.model.Area;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AreaConverter {
    @Autowired
    private ModelMapper modelMapper;
    public AreaDTO converEntityToDto (Area entity){
        AreaDTO results = modelMapper.map(entity, AreaDTO.class);
        return results;
    }

    public Area converDTOToEntity(AreaDTO areaDTO){
        Area area = modelMapper.map(areaDTO, Area.class);
        return area;
    }

}
