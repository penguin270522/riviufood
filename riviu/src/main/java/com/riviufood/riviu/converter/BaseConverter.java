package com.riviufood.riviu.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BaseConverter {
    private final ModelMapper modelMapper;

    @Autowired
    public BaseConverter(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public <D, E> D convertEntityToDto(E entity, Class<D> dtoClass) {
        return modelMapper.map(entity, dtoClass);
    }

    public <D, E> E convertDtoToEntity(D dto, Class<E> entityClass) {
        return modelMapper.map(dto, entityClass);
    }
}
