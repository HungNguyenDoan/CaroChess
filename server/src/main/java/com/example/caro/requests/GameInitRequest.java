package com.example.caro.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class GameInitRequest {
    @NotNull(message = "this param is required")
    Integer first;
    @NotNull(message = "this param is required")
    Long levelId;
}
