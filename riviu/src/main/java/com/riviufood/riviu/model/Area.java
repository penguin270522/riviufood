package com.riviufood.riviu.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Area extends BaseEntity{

    @Column(nullable = false, unique = true, length = 255)
    private String name;
    @Column(nullable = false, unique = true, length = 255)
    private String value;
}
