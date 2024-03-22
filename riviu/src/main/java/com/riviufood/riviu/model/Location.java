package com.riviufood.riviu.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

    private String  openTime;
    private String closeTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;
}
