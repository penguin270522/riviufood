package com.riviufood.riviu.converter;

import com.riviufood.riviu.dtos.LocationDTO;
import com.riviufood.riviu.model.Location;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationConverter {

    private final ModelMapper modelMapper;

    @Autowired
    public LocationConverter(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public LocationDTO convertEntityToDto(Location location) {
        LocationDTO locationDTO = modelMapper.map(location, LocationDTO.class);
        return locationDTO;
    }

    public Location convertDtoToEntity(LocationDTO locationDTO) {
        Location location = modelMapper.map(locationDTO, Location.class);
        return location;
    }
}
