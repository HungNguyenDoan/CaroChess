package com.example.caro.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.caro.repositories.LevelRepository;
import com.example.caro.responses.LevelResponse;

@Service
public class LevelService {

    @Autowired
    private LevelRepository levelRepository;

    public ResponseEntity<Object> getAllLevels() {
        return new ResponseEntity<Object>(new LevelResponse(200, levelRepository.findAll()), HttpStatus.OK);
    }
}
