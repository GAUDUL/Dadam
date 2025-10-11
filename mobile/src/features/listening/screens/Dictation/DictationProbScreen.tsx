import { Text, View, ScrollView, StyleSheet } from "react-native";
import { useListeningNavigation } from "../../../../navigation/useAppNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ListeningStackParamList } from "../../../../navigation/types";
import { useDictaionProb } from "../../hooks/useDicationProb";
import { useTts } from "../../hooks/useTts";
import { useEffect, useRef, useState } from "react";
import { DictationRequest, DictationProb } from "../../types";
import DictationCanvas from "../../components/DictationCanvas";
import DictationButtons from "../../components/DictationButtons";
import DictationResult from "../../components/DictationResult";


type DictationProbRouteProp = RouteProp<ListeningStackParamList, "DictationProb">;

export default function DictationProbScreen() {
  const navigation = useListeningNavigation();
  const route = useRoute<DictationProbRouteProp>();
  const { getDictaionProb, submit } = useDictaionProb();
  const { getVoice, deleteTtsFile } = useTts();
  const { problemSetId } = route.params;
  const signRef = useRef<any>(null);

  const [score, setScore] = useState(0);
  const [problemIndex, setProblemIndex] = useState(0);
  const [dictationProb, setDictationProb] = useState<DictationProb | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);

  useEffect(() => {
    const loadProblem = async () => {
      setIsSubmitted(false);
      const prob = await getDictaionProb({ problemSetId, problemIndex });
      setDictationProb(prob);
    };
    loadProblem();
  }, [problemIndex]);

  const handleNext = async () => {
    signRef.current?.clearSignature();
    if (dictationProb) await deleteTtsFile(dictationProb);

    if (problemIndex >= 4) {
      navigation.reset({
        index: 0,
        routes: [{ name: "DictationScore", params: { score } }],
      });
    } else {
      setProblemIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    signRef.current?.readSignature();
  };

  const onOK = async (dataURL: string) => {
    try {
      const m = dataURL.match(/^data:image\/.+;base64,(.*)$/);
      if (!m) throw new Error("유효하지 않은 dataURL");
      const base64 = m[1];
      const data: DictationRequest = {
        imageBase64: base64,
        problemSetId,
        problemIndex,
      };

      const res = await submit(data);
      if (res.correct) setScore((prev) => prev + 1);
      setUserAnswer(res.userAnswer);
      setIsSubmitted(true);
    } catch (err) {
      console.error("제출 실패", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>잘 듣고, 그대로 받아 적어보세요</Text>

      <DictationCanvas signRef={signRef} onOK={onOK} />

      {!isSubmitted ? (
        <DictationButtons
          onVoice={() => dictationProb && getVoice(dictationProb)}
          onClear={() => signRef.current?.clearSignature()}
          onSubmit={handleSubmit}
        />
      ) : (
        <DictationResult
          userAnswer={userAnswer}
          correctAnswer={dictationProb?.body ?? ""}
          translated={dictationProb?.translatedBody}
          onNext={handleNext}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#d9e8ce",
    alignItems: "center",
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
});
