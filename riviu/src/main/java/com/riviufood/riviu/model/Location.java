package com.riviufood.riviu.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Getter
@Setter
public class Location extends BaseEntity{
    @Column(nullable = false, unique = true, length = 255)
    private String name;

    @Column(nullable = false,length = 255)
    private String address;

    @Column(nullable = false, length = 255)
    private String numberPhone;

    @Column(nullable = false, length = 255)
    private Integer lowestPrince;

    @Column(nullable = false, length = 255)
    private Integer highestPrince;

    private LocalTime  openTime;
    private LocalTime closeTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;
}
