package com.example.backend.domain.listening.cardSelect;

import com.example.backend.domain.listening.cardSelect.dto.Card;
import com.example.backend.domain.listening.cardSelect.dto.CardProblem;
import com.example.backend.domain.listening.word.Word;
import com.example.backend.domain.listening.word.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardSelectService {

    private final WordRepository wordRepository;

    //5개의 카드 고르기 문제 생성
    public List<CardProblem> createProblems() {
        List<Word> answerWords = wordRepository.findRandomWords(5);
        List<CardProblem> problems = new ArrayList<>();

        for (Word answer : answerWords) {
            List<Word> wrongOptions = wordRepository.findRandomWordsExcludeId(answer.getId(),3);
            List<Card> cards = new ArrayList<>();

            cards.add(new Card(answer.getId(), answer.getBody(),answer.getImageUrl()));

            for(Word w : wrongOptions) {
                cards.add(new Card(w.getId(), w.getBody(), w.getImageUrl()));
            }

            Collections.shuffle(cards);

            int answerIndex = -1;
            for(int i = 0; i < cards.size();i++) {
                if(cards.get(i).getWordId() == answer.getId()){
                    answerIndex = i;
                    break;
                }
            }

            problems.add(new CardProblem( answerIndex, cards));
        }

        return problems;
    }

}
