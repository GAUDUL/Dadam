import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DictationResult({ userAnswer, correctAnswer, translated, onNext }: any) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.resultBox}>
        <Text style={styles.userAnswer}>사용자 답안: {userAnswer}</Text>
        <Text style={styles.correctAnswer}>답: {correctAnswer}</Text>
        {translated && <Text style={styles.translated}>{translated}</Text>}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={onNext} activeOpacity={0.7}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  resultBox: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  userAnswer: {
    color: '#666',
    fontSize: 16,
    marginBottom: 6,
  },
  correctAnswer: {
    color: '#222',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  translated: {
    color: '#000000ff',
    fontSize: 18,
    fontStyle: 'italic',
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#18492eff',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
