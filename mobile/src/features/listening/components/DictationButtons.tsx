import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function DictationButtons({ onVoice, onClear, onSubmit }: any) {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity style={[styles.button, styles.voice]} onPress={onVoice} activeOpacity={0.7}>
        <Text style={styles.buttonText}>듣기 🔊</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.clear]} onPress={onClear} activeOpacity={0.7}>
        <Text style={styles.buttonText}>지우기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.submit]} onPress={onSubmit} activeOpacity={0.7}>
         <Text style={[styles.buttonText, { color: '#fff' }]}>정답 제출</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  voice: {
    backgroundColor: "#fff",
  },
  clear: {
    backgroundColor: "#f1f1f1ff",
  },
  submit: {
    backgroundColor: "#18492eff",
  },
});
