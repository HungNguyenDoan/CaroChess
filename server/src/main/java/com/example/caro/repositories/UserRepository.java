package com.example.caro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.caro.models.User;

public interface UserRepository extends JpaRepository<User,Long>  {
    User findByUsername(String username);
}
