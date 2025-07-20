package com.example.backend.domain.listening.cardSelect;

import com.example.backend.domain.listening.cardSelect.dto.Card;
import com.example.backend.domain.listening.cardSelect.dto.CardProblem;
import com.example.backend.domain.listening.cardSelect.dto.CardProblemSet;
import com.example.backend.domain.listening.word.Word;
import com.example.backend.domain.listening.word.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class CardSelectService {

    private final WordRepository wordRepository;
    //일단은 메모리 기반 캐싱 이용
    private final Map<String, CardProblemSet> cache = new ConcurrentHashMap<>();

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

    //5개의 카드 고르기 문제를 하나로 묶어서 반환
    public String createProblemSet() {

        List<CardProblem> problems = createProblems();

        String problemSetId = UUID.randomUUID().toString();
        CardProblemSet problemSet = new CardProblemSet(problemSetId, problems);

        cache.put(problemSetId, problemSet);
        return problemSetId;
    }

    //id와 index를 바탕으로 적절한 문제 반환
    public CardProblem getProblem(String problemSetId, int problemIndex) {
        CardProblemSet problemSet = cache.get(problemSetId);
        if( problemSet == null) throw new RuntimeException("해당 id의 문제를 찾을 수 없습니다");

        List<CardProblem> problems = problemSet.getProblems();
        if(problemIndex<0 || problemIndex >= problems.size()) throw new IllegalArgumentException("유효하지 않은 인덱스입니다.");

        return problemSet.getProblems().get(problemIndex);
    }

}
