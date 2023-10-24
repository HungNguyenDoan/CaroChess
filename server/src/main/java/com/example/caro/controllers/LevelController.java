package com.example.caro.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.caro.services.LevelService;

@RestController
@RequestMapping("level")
public class LevelController {

    @Autowired
    private LevelService levelService;

    @GetMapping("all")
    public ResponseEntity<Object> getAllLevel(){
        return levelService.getAllLevels();
    }
}
