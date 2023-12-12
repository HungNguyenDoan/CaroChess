package com.example.caro.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.caro.JWT.JWTUserDetail;
import com.example.caro.models.Game;
import com.example.caro.models.Level;
import com.example.caro.models.User;
import com.example.caro.repositories.*;
import com.example.caro.responses.GameListResponse;
import com.example.caro.responses.GameResponse;
import com.example.caro.responses.Response;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<Object> initNewGame(Integer first, Long level_id, Integer hard) {
        try {
            JWTUserDetail userDetail = (JWTUserDetail) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal();
            User user = userRepository.getReferenceById(userDetail.getId());
            Level level = levelRepository.findById(level_id).get();
            Game newGame = Game.builder()
                    .first(first)
                    .user(user)
                    .hard(hard)
                    .level(level)
                    .status(initNewChessTable())
                    .build();
            return new ResponseEntity<Object>(new GameResponse(200, gameRepository.save(newGame)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Object>(new Response(400, "Wrong param"), HttpStatus.BAD_REQUEST);
        }
    }

    private String initNewChessTable() {
        return "0".repeat(225);
    }

    public ResponseEntity<Object> getAllHistory() {
        JWTUserDetail userDetail = (JWTUserDetail) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        User user = userRepository.getReferenceById(userDetail.getId());
        return new ResponseEntity<Object>(new GameListResponse(200, gameRepository.getAllByUser(user)),HttpStatus.OK);
    }
    @Transactional
    public void updateGame(String boardTable, Long id, Integer status){
        Game game = gameRepository.getReferenceById(id);
        game.setStatus(boardTable);
        game.setResult(status);
        gameRepository.save(game);
    }
}
