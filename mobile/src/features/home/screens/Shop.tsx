import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useHomeNavigation } from '../../../navigation/useAppNavigation';
import { useShop } from '../hooks/useShop';
import ProductItem from '../components/ProductItem';
import CoinBadge from '../components/CoinBadge';

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
      <View style={styles.row}>
        <View style={styles.left}></View>

        <View style={styles.right}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <CoinBadge coin={coin} absolute={false} />
          </View>
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
            contentContainerStyle={{ paddingTop: 8 }}
            style={{ backgroundColor: 'white', borderRadius: 12, padding: 8 }}
          />
        </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor:'#eee4dbff' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  row: { flex: 1, flexDirection: 'row' },
  left: { flex: 1 },
  right: { flex: 1, paddingLeft: 8 }, 
});