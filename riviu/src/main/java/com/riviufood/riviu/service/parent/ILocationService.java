package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.LocationDTO;
import com.riviufood.riviu.model.Location;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ILocationService {
    Location findById(long id);
    Location createLocation(LocationDTO locationDTO);

    List<Location> findByAll();

    Location updateLocation(long id);

    void deleteAllById(List<Long> ids);

}
