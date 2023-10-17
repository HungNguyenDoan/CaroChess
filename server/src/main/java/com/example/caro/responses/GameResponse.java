package com.example.caro.responses;

import com.example.caro.models.Game;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameResponse {
    private int code;
    private Game game;
}
