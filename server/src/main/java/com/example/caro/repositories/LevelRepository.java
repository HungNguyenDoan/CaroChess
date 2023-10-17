package com.example.caro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.caro.models.Level;

public interface LevelRepository extends JpaRepository<Level, Long> {
    
}
