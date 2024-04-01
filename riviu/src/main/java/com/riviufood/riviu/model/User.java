package com.riviufood.riviu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@EntityListeners(AuditingEntityListener.class) //  @CreatedDate
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String firstName;

    @Column(nullable = true)
    private String lastName;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(nullable = false, unique = true, length = 200)
    private String username;

    @Column(nullable = false, length = 200)
    private String password;


    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToOne
    @JoinColumn(name = "collection_id")
    private Collections collections;


    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER) //fetch
    private List<Post> post = new ArrayList<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()   {
        return List.of(new SimpleGrantedAuthority(getRole().getCode()));
    }




    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
