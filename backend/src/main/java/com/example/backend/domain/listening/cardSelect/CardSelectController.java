package com.example.backend.domain.listening.cardSelect;

import com.example.backend.domain.listening.cardSelect.dto.Card;
import com.example.backend.domain.listening.cardSelect.dto.CardProblem;
import com.example.backend.domain.listening.cardSelect.dto.CardSelectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/listening/card")
@RequiredArgsConstructor
public class CardSelectController {

    private final CardSelectService cardSelectService;

    @GetMapping("/start")
    public ResponseEntity<String> cardSelectStart() {
        String problemId = cardSelectService.createProblemSet();
        return ResponseEntity.ok().body(problemId);
    }

    @GetMapping("/problem")
    public ResponseEntity<CardProblem> cardSelectProblem(
            @RequestParam String problemSetId,
            @RequestParam int problemIndex
    ) {
        CardProblem problem = cardSelectService.getProblem(problemSetId, problemIndex);
        return ResponseEntity.ok().body(problem);
    }

    @PostMapping("/submit")
    public ResponseEntity<Boolean> cardSelectSubmit(
            @RequestBody CardSelectRequest request
    ) {
        boolean isCorrect = cardSelectService.checkAnswer(request);
        return ResponseEntity.ok(isCorrect);
    }
}
