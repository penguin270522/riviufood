package com.riviufood.riviu.service;

import com.riviufood.riviu.converter.LocationConverter;
import com.riviufood.riviu.dtos.LocationDTO;
import com.riviufood.riviu.exception.DataNotFoundException;
import com.riviufood.riviu.model.Location;
import com.riviufood.riviu.model.User;
import com.riviufood.riviu.repository.LocationRepository;
import com.riviufood.riviu.service.auth.ProfileService;
import com.riviufood.riviu.service.parent.ILocationService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
@Service
public class LocationService implements ILocationService {

    private final LocationRepository locationRepository;
    private final LocationConverter locationConverter;

    public LocationService(LocationRepository locationRepository, LocationConverter locationConverter) {
        this.locationRepository = locationRepository;
        this.locationConverter = locationConverter;
    }

    @Override
    public Location findById(long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("cannot find location with id " + id));
    }

    @Override
    public Location createLocation(LocationDTO locationDTO) {
        Location location = locationConverter.convertDtoToEntity(locationDTO);
        User user = ProfileService.getLoggedInUser();
        location.setCreateBy(user.getFirstName() + " - " + user.getLastName());
        location.setCreatedDate(new Date());
        return locationRepository.save(location);
    }


    @Override
    public List<Location> findByAll() {
        return locationRepository.findAll();
    }

    @Override
    public Location updateLocation(long id) {
        return null;
    }

    @Override
    public void deleteAllById(List<Long> ids) {
        locationRepository.deleteAllById(ids);
    }
}
