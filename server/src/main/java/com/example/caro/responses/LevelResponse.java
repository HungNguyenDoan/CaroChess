package com.example.caro.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LevelResponse {
    Integer code;
    Object response;
}
