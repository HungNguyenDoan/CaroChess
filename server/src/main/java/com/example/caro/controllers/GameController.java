package com.example.caro.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.caro.requests.GameInitRequest;
import com.example.caro.services.GameService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("game")
public class GameController {
    @Autowired
    private GameService gameService;

    @PostMapping("init")
    public ResponseEntity<Object> initNewGame(@Valid @RequestBody GameInitRequest data){
        return gameService.initNewGame(data.getFirst(), data.getLevelId());
    }
}
