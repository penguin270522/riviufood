package com.riviufood.riviu.service;

import com.riviufood.riviu.converter.LocationConverter;
import com.riviufood.riviu.dtos.LocationDTO;
import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.dtos.ReviewDTO;
import com.riviufood.riviu.enums.Status;
import com.riviufood.riviu.exception.DataNotFoundException;
import com.riviufood.riviu.model.*;
import com.riviufood.riviu.repository.LocationRepository;
import com.riviufood.riviu.repository.PictureRepository;
import com.riviufood.riviu.service.auth.ProfileService;
import com.riviufood.riviu.service.parent.ILocationService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service
public class LocationService implements ILocationService {

    private final LocationRepository locationRepository;
    private final LocationConverter locationConverter;
    private final PictureRepository pictureRepository;
    private final AreaService areaService;

    private final LocationFoodService locationFoodService;


    public LocationService(LocationRepository locationRepository, LocationConverter locationConverter, PictureRepository pictureRepository, AreaService areaService, LocationFoodService locationFoodService) {
        this.locationRepository = locationRepository;
        this.locationConverter = locationConverter;
        this.pictureRepository = pictureRepository;
        this.areaService = areaService;
        this.locationFoodService = locationFoodService;
    }

    @Override
    public Location findById(long id) {
        return locationRepository.findById(id)
                    .orElseThrow(() -> new DataNotFoundException("cannot find location with id " + id));
    }

    @Override
    public LocationDTO createLocation(LocationDTO locationDTO) {
       try{
           Area area = areaService.findById(locationDTO.getArea_id());
           LocationFood locationFood = locationFoodService.findById(locationDTO.getLocationFood_id());
           Location location = locationConverter.convertDtoToEntity(locationDTO);
           User user = ProfileService.getLoggedInUser();
           location.setCreateBy(user.getUsername());
           location.setUser(user);
           location.setArea(area);
           location.setStatus(Status.PENDING);
           location.setLocationFood(locationFood);
           location.setWatchWord(locationDTO.getWatch_word());
           location.setCreatedDate(new Date());
           locationRepository.save(location);
           locationDTO.setId(location.getId());
           locationDTO.setStatus(location.getStatus());
           return locationDTO;
       }catch (Exception e){
           throw new RuntimeException("Failed to create location: " + e.getMessage(), e);
       }
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

    @Override
    public List<LocationDTO> searchLocation(String name) {
        List<Location> locations = locationRepository.searchByName(name);
        List<LocationDTO> results = new ArrayList<>();
        for(Location item : locations){
            LocationDTO locationDTO = new LocationDTO();
            locationDTO.setName(item.getName());
            results.add(locationDTO);
        }
        return results;
    }

    @Override
    public void deleteLocationById(long id) {
        Location location = findById(id);
        if(location != null){
            locationRepository.delete(location);
        }
    }

    @Override
    public void deleteLocation(long id) {
        Location location = findById(id);
        locationRepository.delete(location);
    }

    @Override
    public ResponseMessage updateLocation(Long id, LocationDTO locationDTO) {
        Location location = findById(id);
        LocationFood locationFood = locationFoodService.findById(locationDTO.getLocationFood_id());
        Area area = areaService.findById(locationDTO.getArea_id());
        location.setName(locationDTO.getName());
        location.setLocationFood(locationFood);
        location.setArea(area);
        location.setWatchWord(locationDTO.getWatch_word());
        location.setAddress(locationDTO.getAddress());
        location.setNumberPhone(locationDTO.getNumberPhone());
        location.setOpenTime(locationDTO.getOpenTime());
        location.setCloseTime(locationDTO.getCloseTime());
        location.setLowestPrince(locationDTO.getLowestPrince());
        location.setHighestPrince(locationDTO.getHighestPrince());
        locationRepository.save(location);
        return ResponseMessage.success();
    }

    @Override
    public ResponseMessage reviewrLocation(Long locationId, ReviewDTO status) {
        try{
            Location existingLocation = findById(locationId);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User reviewer = (User) authentication.getPrincipal();
            existingLocation.setReviewr(reviewer);

            switch (status.getStatus()) {
                case APPROVED:
                    existingLocation.setStatus(Status.APPROVED);
                    break;
                case REJECTED:
                    existingLocation.setRejectedMessage(status.getMessage());
                    existingLocation.setStatus(Status.REJECTED);
                    break;
            }
            locationRepository.save(existingLocation);
            return ResponseMessage.success();
        }catch (Exception e){
            return ResponseMessage.baderror();
        }
    }
}
