package com.example.caro.constraints;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Constraint(validatedBy = UniqueValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)

public @interface Unique {
    String message() default "username has been used";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default{};
}
