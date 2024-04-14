package com.riviufood.riviu.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Area extends BaseEntity{
    @Column(nullable = false, unique = true, length = 255)
    private String name;
    @Column(nullable = false, unique = true, length = 255)
    private String value;
}
