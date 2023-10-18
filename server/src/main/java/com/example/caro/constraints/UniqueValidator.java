package com.example.caro.constraints;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.caro.repositories.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


@Component
public class UniqueValidator implements ConstraintValidator<Unique, String> {
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return userRepository.findByUsername(email) == null;
    }
}
