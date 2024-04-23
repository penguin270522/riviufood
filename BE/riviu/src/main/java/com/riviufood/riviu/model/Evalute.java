package com.riviufood.riviu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Evalute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JsonIgnore
    private Post post;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "location_id")
    private Location location;

    private Integer overall;

    private Integer cleanLiness;

    private Integer flavor;

    private Integer space;

    private Integer price;

    private Integer service;

    public int totelEvalute(){
        return (overall + cleanLiness + flavor + space + price + service)/6;
    }
}
