package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.LocationDTO;
import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.dtos.ReviewDTO;
import com.riviufood.riviu.model.Location;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ILocationService {
    Location findById(long id);
    Object createLocation(LocationDTO locationDTO);

    List<Location> findByAll();

    Location updateLocation(long id);

    void deleteAllById(List<Long> ids);

    List<LocationDTO> searchLocation(String name);

    void deleteLocationById(long id);

    void deleteLocation(long id);

    ResponseMessage updateLocation(Long id, LocationDTO locationDTO);

    ResponseMessage reviewrLocation(Long locationId, ReviewDTO status);

    List<Location> getLocationWithAPRROVED();
}
