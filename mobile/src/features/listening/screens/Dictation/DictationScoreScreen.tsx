import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ListeningStackParamList } from '../../../../navigation/types';
import { useListeningNavigation } from '../../../../navigation/useAppNavigation';
import { useEffect } from 'react';
import { useReward } from '../../hooks/useReward';
import ScoreComponent from '../../components/ScoreComponent';

type DictationProbRouteProp = RouteProp<ListeningStackParamList, 'DictationScore'>;

export default function DictationScoreScreen() {
  const navigation = useListeningNavigation();
  const route = useRoute<DictationProbRouteProp>();
  const { score } = route.params;
  const { getReward } = useReward();

  useEffect(() => {
    const reward = async () => {
      await getReward(score);
    };
    reward();
  }, [score]);

  const handleMain = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ListeningHome' }],
    });
  };

  return (
    <ScoreComponent
      title="받아쓰기 결과"
      score={score}
      maxScore={5}
      coinsPerPoint={10}
      onPressHome={handleMain}
    />
  );
}
