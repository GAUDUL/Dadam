import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function ProductItem({ item, owned, coin, processing, onPurchase }:ProductItemProps) {
  const isOwned = owned.includes(item.id);
  const affordable = coin >= item.price;
  const disabled = isOwned || !affordable || processing !== null;
  const buttonText = isOwned ? '구매됨' : !affordable ? '코인 부족' : '구매';

  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} 코인</Text>
      </View>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => onPurchase(item)}
        style={[styles.button, disabled && styles.buttonDisabled]}
      >
        {processing === item.id ? <ActivityIndicator /> : <Text style={styles.buttonText}>{buttonText}</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  info: { flexDirection: 'column' },
  name: { fontSize: 16 },
  price: { fontSize: 14, color: '#666' },
  button: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, backgroundColor: '#007AFF' },
  buttonDisabled: { backgroundColor: '#bbb' },
  buttonText: { color: '#fff' },
});
