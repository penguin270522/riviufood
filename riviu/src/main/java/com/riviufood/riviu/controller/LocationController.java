package com.riviufood.riviu.controller;

import com.riviufood.riviu.dtos.LocationDTO;
import com.riviufood.riviu.exception.DataNotFoundException;
import com.riviufood.riviu.model.Location;
import com.riviufood.riviu.service.parent.ILocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {
    private final ILocationService locationService;

    public LocationController(ILocationService locationService) {
        this.locationService = locationService;
    }


    @PostMapping("/{areaId}")
    public ResponseEntity<?> createLocation(@RequestBody LocationDTO locationDTO,
                                            @PathVariable Long areaId
    ){
        try{
            Location location = locationService.createLocation(locationDTO, areaId);
            return ResponseEntity.ok(location);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllLocation(){
        List<Location> locationList= locationService.findByAll();
        return ResponseEntity.ok(locationList);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteLocations(@RequestBody List<Long> locationId){
        locationService.deleteAllById(locationId);
        return ResponseEntity.ok("delete success!");
    }

    @GetMapping("/search")
    public List<LocationDTO> searchLocation(@RequestParam String name){

        return locationService.searchLocation(name);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Location location = locationService.findById(id);

        return ResponseEntity.ok(location);
    }

}
