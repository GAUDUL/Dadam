package com.example.backend.domain.listening.cardSelect.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

//카드 고르기 문제
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardProblem {
    private int answerIndex;
    private List<Card> cards;
}
