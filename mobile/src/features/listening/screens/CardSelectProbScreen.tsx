import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useListeningNavigation } from '../../../navigation/useAppNavigation';
import { useCardProb } from '../hooks/useCardProb';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ListeningStackParamList } from '../../../navigation/types';
import { useEffect, useState } from 'react';
import { Card } from '../types';
import { useTts } from '../hooks/useTts';

type CardSelectProbRouteProp = RouteProp<ListeningStackParamList, 'CardSelectProb'>;

export default function CardSelectProbScreen() {
    const navigation = useListeningNavigation();
    const route = useRoute<CardSelectProbRouteProp>();
    const {submit, getCardProb, loading, error} = useCardProb(); 
    const {getVoice, deleteTtsFile} = useTts();
    const {problemSetId} = route.params;

    const [problemIndex, setProblemIndex] = useState(0);
    const [answerIndex, setAnswerIndex] = useState(-1);
    const [selectedCardIndex , setSelectedCardIndex] = useState<number | null> (null);
    const [score, setscore] = useState(0);
    const [cards, setCards] = useState<Card[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);


    useEffect(()=>{
        const loadProblem = async () => {
            setIsSubmitted(false);
            setSelectedCardIndex(null);
            const prob = await getCardProb({problemSetId, problemIndex});
            setCards(prob.cards);
            setAnswerIndex(prob.answerIndex);
        }
        loadProblem();
    },[problemIndex]);

    const handleSubmit = async () =>{
        if(selectedCardIndex===null){
            Alert.alert('정답 카드를 선택하세요');
            return;
        }
        const answer = { problemSetId, problemIndex, selectedCardIndex };
        
        const res = await submit(answer);
        if(res) setscore((prev)=>prev+1);
        setIsSubmitted(true);
    }

    const handleNext = async () => {
        if(answerIndex !== -1){
            const text = cards[answerIndex].body;
            await deleteTtsFile(text);
        }
        if(problemIndex >= 4) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'CardSelectScore', params: { score } }],
            });
        }
        else setProblemIndex((prev)=>prev + 1);
    }

    const handleVoice = async () => {
        if(answerIndex !== -1) {
            const text = cards[answerIndex].body;
            getVoice(text);
        }
    }
    
    
  return (
    <View>
        <Text>음성을 듣고 적절한 카드를 골라보세요</Text>
        {cards.map((card, index) => (
            <TouchableOpacity
             key={index}
             onPress={() => setSelectedCardIndex(index)}
             disabled={isSubmitted}
             style={[
                 styles.cardButton,
                 isSubmitted && styles.cardButtonDisabled,
                 selectedCardIndex === index && styles.cardButtonSelected,
             ]}
            >
                <Text>{card.body}</Text>
            </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleVoice}>
            <Text>음성 듣기</Text>
        </TouchableOpacity>
        {!isSubmitted && (
            <TouchableOpacity onPress={handleSubmit}>
            <Text>정답 제출</Text>
            </TouchableOpacity>
        )}
        {isSubmitted && (
            <TouchableOpacity onPress={handleNext}>
                <Text>다음</Text>
            </TouchableOpacity>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: 'transparent',
    opacity: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardButtonDisabled: {
    opacity: 0.5,
  },
  cardButtonSelected: {
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  cardText: {
    color: 'black',
  },
  cardTextSelected: {
    color: 'black',
  },
});