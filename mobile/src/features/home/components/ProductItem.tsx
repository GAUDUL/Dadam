import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default function ProductItem({
  item,
  owned,
  coin,
  processing,
  equippedId,
  tryEquipped,
  onPurchase,
  onEquip,
  onTry,
}: ProductItemProps) {
  const isOwned = owned.includes(item.id);
  const isEquipped = equippedId === item.id;
  const affordable = coin >= item.price;

  return (
    <View style={styles.item}>
      <Image
        source={item.image}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        {!isOwned && <Text style={styles.price}>{item.price} 코인</Text>}
        {isEquipped && <Text style={styles.equippedText}>착용 중</Text>}
      </View>

      {isOwned ? (
        <TouchableOpacity
          onPress={() => onEquip(item)}
          style={[styles.button, styles.equipButton]}
        >
          <Text style={styles.buttonText}>{isEquipped ? '해제하기' : '착용하기'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={!affordable || processing !== null}
          onPress={() => onPurchase(item)}
          style={[styles.button, (!affordable || processing !== null) && styles.buttonDisabled]}
        >
          {processing === item.id ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{affordable ? '구매' : '코인 부족'}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
    itemImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500' },
  price: { fontSize: 14, color: '#666', marginTop: 2 },
  equippedText: { color: '#28a745', marginTop: 2 },
  button: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, backgroundColor: '#007AFF' },
  buttonDisabled: { backgroundColor: '#bbb' },
  buttonText: { color: '#fff', fontWeight: '600' },
  equipButton: { backgroundColor: '#3a2408ff' },
});
