import { View, Text, StyleSheet } from 'react-native';

interface CoinBadgeProps {
  coin: number;
  absolute?: boolean;
}

export default function CoinBadge({ coin, absolute = true }: CoinBadgeProps) {
  return (
    <View style={[styles.container, absolute ? styles.absolute : null]}>
      <Text style={styles.coin}>💰 {coin}</Text>
      <Text style={styles.label}>보유 코인</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 70,
    backgroundColor: '#f5edb1ff',
    borderColor: '#ffd700',
    borderWidth: 2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  coin: {
    fontSize: 26,
    fontWeight: '700',
    color: '#b37400',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5a3e24',
  },
  absolute: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
});
