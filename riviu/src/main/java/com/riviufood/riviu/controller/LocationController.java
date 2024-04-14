package com.riviufood.riviu.controller;

import com.riviufood.riviu.dtos.LocationDTO;
import com.riviufood.riviu.dtos.ResponseMessage;
import com.riviufood.riviu.exception.DataNotFoundException;
import com.riviufood.riviu.model.Location;
import com.riviufood.riviu.service.parent.ILocationService;
import org.springframework.http.HttpStatus;
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


    @PostMapping
    public ResponseEntity<LocationDTO> createLocation(@RequestBody LocationDTO locationDTO

    ) {
        LocationDTO locationDTO1 = null;
        try {
            locationDTO1 = (LocationDTO) locationService.createLocation(locationDTO);
            return new ResponseEntity<>(locationDTO1,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(locationDTO1, HttpStatus.BAD_REQUEST);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLocationById(@PathVariable long id){
        try{
            locationService.deleteLocationById(id);
            return ResponseEntity.ok("succes");
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable Long id){
        locationService.deleteLocation(id);
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateLocation(@PathVariable long id,
                                                          @RequestBody LocationDTO locationDTO){

        ResponseMessage response = locationService.updateLocation(id,locationDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

}
