package com.riviufood.riviu.repository;

import com.riviufood.riviu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);

    User findByEmail(String email);
}
