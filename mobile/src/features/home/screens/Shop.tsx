import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useHomeNavigation } from '../../../navigation/useAppNavigation';
import { useShop } from '../hooks/useShop';
import ProductItem from '../components/ProductItem';

const PRODUCTS = [
  { id: 1, name: '상품 1', price: 100 },
  { id: 2, name: '상품 2', price: 200 },
  { id: 3, name: '상품 3', price: 300 },
  { id: 4, name: '상품 4', price: 400 },
  { id: 5, name: '상품 5', price: 500 },
  { id: 6, name: '상품 6', price: 600 },
];

export default function Shop() {
  const { coin, owned, processing, handlePurchase } = useShop();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <Text style={styles.coin}>보유 코인: {coin}</Text>

        <FlatList
        data={PRODUCTS}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            owned={owned}
            coin={coin}
            processing={processing}
            onPurchase={handlePurchase}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  coin: { marginBottom: 12 },
  back: { marginTop: 12, alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});