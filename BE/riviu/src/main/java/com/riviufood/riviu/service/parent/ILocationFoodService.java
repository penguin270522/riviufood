package com.riviufood.riviu.service.parent;

import com.riviufood.riviu.dtos.LocationFoodDTO;
import com.riviufood.riviu.model.LocationFood;

import java.util.List;

public interface ILocationFoodService {
    LocationFood createNameTagFood(LocationFood locationFood);
    LocationFood findLocationFood(String name);

    List<LocationFoodDTO> locationFoodList();

    LocationFood findById(Long id);
}
