package com.riviufood.riviu.repository;

import com.riviufood.riviu.model.LocationFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationFoodRepository extends JpaRepository<LocationFood, Long> {
    LocationFood findByName(String name);
}
