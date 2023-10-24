package com.example.caro.models;

import com.example.caro.constraints.Unique;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Unique
    @Column(name = "username")
    private String username;
    @JsonIgnore
    @Column(name = "password")
    private String password; 
    @Column(name = "name")
    private String name; 
    @Column(name = "role")
    private String role;
    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    List<Game> listGame;  
}
