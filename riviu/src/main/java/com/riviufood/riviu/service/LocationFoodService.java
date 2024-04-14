package com.riviufood.riviu.service;

import com.riviufood.riviu.dtos.LocationFoodDTO;
import com.riviufood.riviu.exception.DataNotFoundException;
import com.riviufood.riviu.model.LocationFood;
import com.riviufood.riviu.repository.LocationFoodRepository;
import com.riviufood.riviu.service.parent.ILocationFoodService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class LocationFoodService implements ILocationFoodService {
    private final LocationFoodRepository locationFoodRepository;
    @Override
    public LocationFood createNameTagFood(LocationFood locationFood) {
        LocationFood locationFood1 = new LocationFood();
        locationFood1.setName(locationFood.getName());
        locationFood1.setValue(locationFood.getValue());
        return locationFoodRepository.save(locationFood1);
    }

    @Override
    public LocationFood findLocationFood(String name) {
        LocationFood locationFood = locationFoodRepository.findByName(name);
        return locationFood;
    }

    @Override
    public List<LocationFoodDTO> locationFoodList() {
        List<LocationFoodDTO> locationFoodDTOS = new ArrayList<>();
        List<LocationFood> locationFoods = locationFoodRepository.findAll();
        for(LocationFood item : locationFoods){
            LocationFoodDTO locationFoodDTO = new LocationFoodDTO();
            locationFoodDTO.setId(item.getId());
            locationFoodDTO.setName(item.getName());
            locationFoodDTO.setValue(item.getValue());
            locationFoodDTO.setCountLocation(item.countLocation());
            locationFoodDTOS.add(locationFoodDTO);
        }
        return locationFoodDTOS;
    }

    @Override
    public LocationFood findById(Long id) {
        LocationFood locationFood = locationFoodRepository.findById(id).orElseThrow(
                ()-> new DataNotFoundException("dont find by id : " + id)
        );
        return locationFood;
    }
}
