import { View, Text, StyleSheet } from 'react-native';

interface CoinBadgeProps {
  coin: number;
  absolute?: boolean;
}

export default function CoinBadge({ coin, absolute = true }: CoinBadgeProps) {
  return (
    <View style={[styles.container, absolute ? styles.absolute : null]}>
      <Text style={styles.text}>{coin} 💰</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,           // 고정 너비
    height: 40,           // 고정 높이
    backgroundColor: 'white',
    borderColor: '#856060ff',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,      // absolute 아닐 때 간격
  },
  absolute: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  text: { fontSize: 14, fontWeight: '700' },
});