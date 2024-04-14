package com.riviufood.riviu.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationFood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String value;

    @OneToMany(mappedBy = "locationFood", cascade = CascadeType.ALL)
    List<Location> locationList = new ArrayList<>();

    public int countLocation(){
        if(locationList != null){
            return locationList.size();
        }
        return 0;
    }
}
