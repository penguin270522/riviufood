package com.riviufood.riviu.repository;

import com.riviufood.riviu.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query("select u from Location u where u.name like %?1%")
    List<Location> searchByName(String name);

    @Query("select u from Location u where u.statusLocation = 'APPROVED'")
    List<Location> getLocationApproved();

}
