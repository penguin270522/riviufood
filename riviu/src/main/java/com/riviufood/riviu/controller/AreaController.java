package com.riviufood.riviu.controller;

import com.riviufood.riviu.dtos.AreaDTO;
import com.riviufood.riviu.model.Area;
import com.riviufood.riviu.service.AreaService;
import com.riviufood.riviu.service.parent.IAreaService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/area")
public class AreaController {
    private final AreaService areaService;

    public AreaController(AreaService areaService) {
        this.areaService = areaService;
    }


    @PostMapping()
    public ResponseEntity<?> createArea(@RequestBody AreaDTO areaDTO){
        Area area = areaService.createArea(areaDTO);
        return ResponseEntity.ok(area);
    }

    @GetMapping()
    public ResponseEntity<?> findAllArea(){
        List<Area> results = areaService.findByAll();
         return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Area area = areaService.findById(id);
        return ResponseEntity.ok(area);
    }


}
