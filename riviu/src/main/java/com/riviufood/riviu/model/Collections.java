package com.riviufood.riviu.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Collections {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name ="user_id")
    private User user;

    @OneToMany(mappedBy = "collections",fetch = FetchType.EAGER) //fetch
    private List<CollectionPost> post = new ArrayList<>();

}
