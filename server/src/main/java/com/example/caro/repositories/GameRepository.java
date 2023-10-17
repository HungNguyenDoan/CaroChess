package com.example.caro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.caro.models.Game;

public interface GameRepository extends JpaRepository<Game, Long> {

}
