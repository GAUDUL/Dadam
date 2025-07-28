package com.example.backend.domain.listening.cardSelect.dto;

import lombok.Getter;
import lombok.Setter;

//사용자 선택
@Getter
@Setter
public class CardSelectRequest {
    private String problemSetId;
    private int problemIndex;
    private int selectedCardIndex;
}
