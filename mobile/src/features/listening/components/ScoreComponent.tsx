import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface ScoreProps {
  title?: string;
  score: number;
  maxScore?: number; 
  coinsPerPoint?: number;
  onPressHome: () => void; 
}

export default function ScoreComponent({
  title = '결과',
  score,
  maxScore,
  coinsPerPoint = 10,
  onPressHome,
}: ScoreProps) {
  const coins = score * coinsPerPoint;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.scoreBox}>
        <Text style={styles.score}>
          {score} {maxScore ? `/ ${maxScore}` : ''}
        </Text>
        <Text style={styles.coins}>💰 {coins} 코인 획득!</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPressHome} activeOpacity={0.8}>
        <Text style={styles.buttonText}>돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9e8ce',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 30,
    color: '#18492eff',
    textAlign: 'center',
  },
  scoreBox: {
    backgroundColor: '#ffffff',
    paddingVertical: 40,
    paddingHorizontal: 60,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  score: {
    fontSize: 50,
    fontWeight: '900',
    color: '#18492eff',
    textAlign: 'center',
    marginBottom: 10,
  },
  coins: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffb300',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 50,
    backgroundColor: '#18492eff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});
