import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useListeningNavigation } from '../../../navigation/useAppNavigation';
import { useCardProb } from '../hooks/useCardProb';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ListeningStackParamList } from '../../../navigation/types';
import { useEffect, useState } from 'react';
import { Card } from '../types';

type CardSelectProbRouteProp = RouteProp<ListeningStackParamList, 'CardSelectProb'>;

export default function CardSelectProbScreen() {
    const navigation = useListeningNavigation();
    const route = useRoute<CardSelectProbRouteProp>();
    const {submit, getCardProb, loading, error} = useCardProb(); 
    const {problemSetId} = route.params;

    const [problemIndex, setProblemIndex] = useState(0);
    const [selectedCardIndex , setSelectedCardIndex] = useState<number | null> (null);
    const [correctCnt, setCorrectCnt] = useState(0);
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(()=>{
        const loadProblem = async () => {
            const prob = await getCardProb({problemSetId, problemIndex});
            setCards(prob);
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
        if(res) setCorrectCnt((prev)=>prev+1);
    }

    const handleNext = async () => {
        setProblemIndex((prev)=>prev + 1);
    }
    
  return (
    <View>
        <Text>음성을 듣고 적절한 카드를 골라보세요</Text>
        {cards.map((card, index) => (
            <TouchableOpacity
             key={index}
             onPress={() => setSelectedCardIndex(index)}
            >
                <Text>{card.body}</Text>
            </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleSubmit}>
          <Text>정답 제출</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
            <Text>다음</Text>
        </TouchableOpacity>
    </View>
  );
}