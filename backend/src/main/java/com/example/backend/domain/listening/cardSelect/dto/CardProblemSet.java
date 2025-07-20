package com.example.backend.domain.listening.cardSelect.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardProblemSet {
    private String problemId;
    private List<CardProblem> problems;

}

