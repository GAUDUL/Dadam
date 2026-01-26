import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  onVoice: () => void;
  onSubmit: () => void;
  onNext: () => void;
  isSubmitted: boolean;
}

export default function CardSelectButtons({ onVoice, onSubmit, onNext, isSubmitted }: Props) {
  return (
    <View style={styles.buttonWrapper}>
      {!isSubmitted ? (
        <>
          <TouchableOpacity style={[styles.button, styles.voiceButton]} onPress={onVoice}>
            <Text style={[styles.buttonText, styles.voiceButtonText]}> 듣기 🔊</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.primary]} onPress={onSubmit}>
            <Text style={styles.buttonText}>정답 제출</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={[styles.button, styles.primary]} onPress={onNext}>
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#18492eff",
  },
  voiceButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#558662",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
  voiceButtonText: {
    color: "#18492eff",
  },
});
