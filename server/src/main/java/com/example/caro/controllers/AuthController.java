package com.example.caro.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.caro.JWT.JWTTokenProvider;
import com.example.caro.JWT.JWTUserDetail;
import com.example.caro.requests.LoginRequest;
import com.example.caro.responses.LoginResponse;
import com.example.caro.responses.Response;
import com.example.caro.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("register")
    public ResponseEntity<Object> signup(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            userService.create(loginRequest.getUsername(),
                    loginRequest.getPassword());

            return login(loginRequest);
        } catch (Exception e) {
            return new ResponseEntity<Object>(new Response(HttpStatus.UNAUTHORIZED.value(), e.getMessage()),
                    HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            String jwt = tokenProvider.generateToken((JWTUserDetail) authentication.getPrincipal());

            return new ResponseEntity<Object>(
                    new LoginResponse(jwt, ((JWTUserDetail) authentication.getPrincipal()).getUser()),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Object>(
                    new Response(HttpStatus.UNAUTHORIZED.value(), "Tài khoản hoặc mật khẩu không khớp"),
                    HttpStatus.UNAUTHORIZED);
        }
    }
}
