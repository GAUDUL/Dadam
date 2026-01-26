import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ListeningStackParamList } from '../../../../navigation/types';
import { useListeningNavigation } from '../../../../navigation/useAppNavigation';
import { useEffect } from 'react';
import { useReward } from '../../hooks/useReward';
import ScoreComponent from '../../components/ScoreComponent';

type CardSelectProbRouteProp = RouteProp<ListeningStackParamList, 'CardSelectScore'>;

export default function CardSelectScoreScreen() {
    const navigation = useListeningNavigation();
    const route = useRoute<CardSelectProbRouteProp>();
    const {score} = route.params;
    const {getReward} = useReward();

    useEffect(()=>{
        const reward = async () => {
            await getReward(score);
        }
        reward();
    },[score])

    const handleMain = () => {
        navigation.reset({
        index: 0,
        routes: [{ name: 'ListeningHome' }],
        });
    }

  return (
    <ScoreComponent
      title="카드 고르기 결과"
      score={score}
      coinsPerPoint={10}
      onPressHome={handleMain}
    />
  );
}