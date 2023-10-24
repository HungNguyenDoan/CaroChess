package com.example.caro.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.caro.models.Game;
import com.example.caro.models.User;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> getAllByUser(User user);
}
