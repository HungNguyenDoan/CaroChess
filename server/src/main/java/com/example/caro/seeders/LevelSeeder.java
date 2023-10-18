package com.example.caro.seeders;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.caro.models.Level;
import com.example.caro.repositories.LevelRepository;

@Component
public class LevelSeeder {
    @Autowired
    private LevelRepository levelRepository;

    public void seed() {
        Level level1 = Level.builder()
                .id(1L)
                .level_name("Min-Max")
                .build();
        Level level2 = Level.builder()
                .id(2L)
                .level_name("Alpha-Beta")
                .build();
        Level level3 = Level.builder()
                .id(3L)
                .level_name("Hill-Climb")
                .build();
        levelRepository.saveAll(Arrays.asList(new Level[] { level1, level2, level3 }));
    }
}
