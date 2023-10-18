package com.example.caro.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Seeder implements CommandLineRunner {
    @Autowired
    private LevelSeeder levelSeeder;

    @Override
    public void run(String... args) throws Exception {
        levelSeeder.seed();
    }
    
}
