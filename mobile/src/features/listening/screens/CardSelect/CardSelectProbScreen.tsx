import { View, Text, Alert } from "react-native";
import { useListeningNavigation } from "../../../../navigation/useAppNavigation";
import { useCardProb } from "../../hooks/useCardProb";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ListeningStackParamList } from "../../../../navigation/types";
import { useEffect, useState } from "react";
import { Card } from "../../types";
import { useTts } from "../../hooks/useTts";
import CardListButton from "../../components/CardListButton";
import CardSelectButtons from "../../components/CardSelectButton";


type CardSelectProbRouteProp = RouteProp<ListeningStackParamList, "CardSelectProb">;

export default function CardSelectProbScreen() {
  const navigation = useListeningNavigation();
  const route = useRoute<CardSelectProbRouteProp>();
  const { submit, getCardProb } = useCardProb();
  const { getVoice, deleteTtsFile } = useTts();
  const { problemSetId } = route.params;

  const [problemIndex, setProblemIndex] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(-1);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const loadProblem = async () => {
      setIsSubmitted(false);
      setSelectedCardIndex(null);
      const prob = await getCardProb({ problemSetId, problemIndex });
      setCards(prob.cards);
      setAnswerIndex(prob.answerIndex);
    };
    loadProblem();
  }, [problemIndex]);

  const handleSubmit = async () => {
    if (selectedCardIndex === null) {
        Alert.alert("정답 카드를 선택하세요");
      return;
    }
    const res = await submit({ problemSetId, problemIndex, selectedCardIndex });
    if (res) setScore((prev) => prev + 1);
    setIsSubmitted(true);
  };

  const handleNext = async () => {
    if (answerIndex !== -1) await deleteTtsFile(cards[answerIndex]);
    if (problemIndex >= 4) {
      navigation.reset({ index: 0, routes: [{ name: "CardSelectScore", params: { score } }] });
    } else setProblemIndex((prev) => prev + 1);
  };

  const handleVoice = async () => {
    if (answerIndex !== -1) getVoice(cards[answerIndex]);
  };

    return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#d9e8ce" }}> 
        <Text style={{ fontSize: 22, marginBottom: 12, textAlign: "center", fontWeight: "800", color: "#333" }}>
        음성을 듣고 적절한 카드를 골라보세요
        </Text>
        <CardListButton
        cards={cards}
        selectedIndex={selectedCardIndex}
        answerIndex={answerIndex}
        isSubmitted={isSubmitted}
        onSelect={setSelectedCardIndex}
        />
        <CardSelectButtons
        onVoice={handleVoice}
        onSubmit={handleSubmit}
        onNext={handleNext}
        isSubmitted={isSubmitted}
        />
    </View>
    );
}
