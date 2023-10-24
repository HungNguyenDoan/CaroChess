package com.example.caro.models;

import java.util.List;

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

@Entity
@Table(name = "levels")

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    
    @Column(name = "level_name")
    private String level_name;
    @Column(name = "level_source")
    private String level_source;
    @JsonIgnore
    @OneToMany(mappedBy = "level", fetch = FetchType.EAGER)
    List<Game> listGame;
}
