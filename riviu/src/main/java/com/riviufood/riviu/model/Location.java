package com.riviufood.riviu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    private Integer lowestPrince;

    @Column(nullable = false, length = 255)
    private Integer highestPrince;

    private String  openTime;
    private String closeTime;

    private String watchWord;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "locationfood_id")
    private LocationFood locationFood;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Evalute> evaluates;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Picture> pictures = new ArrayList<>();

    public int getTotalEvulate() {
        if (evaluates != null && evaluates.size() > 0) {
            int size = evaluates.size();
            int total = 0;
            for (Evalute evalute : evaluates) {
                total += evalute.totelEvalute();
            }
            return total / size;
        } else {
            return 0;
        }
    }
}
