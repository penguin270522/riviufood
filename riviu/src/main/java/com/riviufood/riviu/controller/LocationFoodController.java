package com.riviufood.riviu.controller;

import com.riviufood.riviu.dtos.LocationFoodDTO;
import com.riviufood.riviu.model.Location;
import com.riviufood.riviu.model.LocationFood;
import com.riviufood.riviu.service.LocationFoodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@AllArgsConstructor
public class LocationFoodController{
    private final LocationFoodService locationFoodService;
    @PostMapping
    public ResponseEntity<LocationFood> createLocationFood(@RequestBody LocationFood locationFood){
        LocationFood locationFood1 = locationFoodService.createNameTagFood(locationFood);
        return new ResponseEntity<>(locationFood1, HttpStatus.CREATED);
    }

    @GetMapping("/{name}")
    public ResponseEntity<LocationFood> findBynameTag(@PathVariable String name){
        LocationFood locationFood = locationFoodService.findLocationFood(name);
        return ResponseEntity.ok(locationFood);
    }

    @GetMapping("/all")
    public ResponseEntity<List<LocationFoodDTO>> getAll(){
        List<LocationFoodDTO> locationFoods = locationFoodService.locationFoodList();
        return ResponseEntity.ok(locationFoods);
    }
}
