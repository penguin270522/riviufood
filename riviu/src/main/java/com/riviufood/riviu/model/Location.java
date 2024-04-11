package com.riviufood.riviu.model;

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

    @Column(nullable = false, length = 255)
    private Integer lowestPrince;

    @Column(nullable = false, length = 255)
    private Integer highestPrince;

    private String  openTime;
    private String closeTime;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Evalute> evaluates;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Picture> pictures = new ArrayList<>();

    public int getTotalEvulate(){
        if(evaluates != null){
            int size = evaluates.size();
            int total = 0;
            for(Evalute evalute : evaluates){
                total += evalute.totelEvalute();
            }
            return total/size;
        }
        else {
            return 0;
        }
    }
}
