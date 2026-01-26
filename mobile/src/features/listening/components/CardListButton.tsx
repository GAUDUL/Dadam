import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { Card } from "../types";
import { REACT_APP_SPRING_API } from '@env';

interface Props {
  cards: Card[];
  selectedIndex: number | null;
  answerIndex: number;
  isSubmitted: boolean;
  onSelect: (index: number) => void;
}

export default function CardListButton({
  cards,
  selectedIndex,
  answerIndex,
  isSubmitted,
  onSelect,
}: Props) {
  const serverBaseUrl = `${REACT_APP_SPRING_API}`;

  return (
    <View style={styles.grid}>
      {cards.map((card, index) => {
        const isCorrect = isSubmitted && index === answerIndex;
        const isWrong = isSubmitted && index === selectedIndex && selectedIndex !== answerIndex;

        return (
          <View key={index} style={styles.cardWrapper}>
            <TouchableOpacity
              onPress={() => onSelect(index)}
              disabled={isSubmitted}
              style={styles.cardButton}
            >
              {card.imageUrl && (
                <Image
                  source={{ uri: `${serverBaseUrl}${card.imageUrl}` }}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              )}

              {selectedIndex === index && !isSubmitted && <View style={styles.overlaySelected} />}
              {isCorrect && <View style={styles.overlayCorrect} />}
              {isWrong && <View style={styles.overlayIncorrect} />}
            </TouchableOpacity>

            <View style={styles.textWrapper}>
              {isSubmitted && (
                <>
                  <Text style={styles.cardText}>{card.body}</Text>
                  {card.translatedBody && <Text style={styles.translatedText}>{card.translatedBody}</Text>}
                </>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  cardButton: {
    width: 200,
    height: 160,
    borderRadius: 8,
    borderWidth:4,
    borderColor:'#558662',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  overlayCorrect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(40, 167, 69, 0.3)',
  },
  overlayIncorrect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(220, 53, 69, 0.3)',
  },
  textWrapper: {
    height: 40,
    marginTop: 4,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  translatedText: {
    fontSize: 18,
    color: '#000000ff',
    textAlign: 'center',
  },
  overlaySelected: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(87, 87, 87, 0.2)', // 연한 회색 오버레이
  },

});
