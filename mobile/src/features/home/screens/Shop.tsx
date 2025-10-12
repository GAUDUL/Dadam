import { View, FlatList, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useShop } from '../hooks/useShop';
import ProductItem from '../components/ProductItem';
import CoinBadge from '../components/CoinBadge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRODUCTS } from '../items';

export default function Shop() {
  const { coin, owned, processing, handlePurchase } = useShop();
  const [equippedId, setEquippedId] = useState<number | null>(null);
  const [tryEquippedId, setTryEquippedId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const savedId = await AsyncStorage.getItem('@equippedId');
      if (savedId) setEquippedId(Number(savedId));
    })();
  }, []);

  const handleEquip = async (item: { id: number }) => {
    const newId = equippedId === item.id ? null : item.id;
    setEquippedId(newId);
    await AsyncStorage.setItem('@equippedId', newId?.toString() ?? '');
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.characterContainer}>
            <Image
              source={require('../../../assets/character.png')}
              style={styles.character}
              resizeMode="contain"
            />

            {(() => {
              const itemId = equippedId ?? tryEquippedId;
              if (!itemId) return null;
              const item = PRODUCTS.find(p => p.id === itemId);
              if (!item) return null;

              return (
                <Image
                  source={item.image}
                  style={{
                    position: 'absolute',
                    top: item.top ?? 0,
                    left: item.left ?? 0,
                    width: item.width ?? 100,
                    height: item.height ?? 100,
                  }}
                  resizeMode="contain"
                />
              );
            })()}
          </View>
        </View>

        {/* 상품 리스트 */}
        <View style={styles.right}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 }}>
            <CoinBadge coin={coin} absolute={false} />
          </View>
          <FlatList
            data={PRODUCTS}
            keyExtractor={(item) => item.id.toString()}
            extraData={[equippedId, tryEquippedId, ...owned, processing]}
            renderItem={({ item }) => (
              <ProductItem
                item={item}
                owned={owned}
                coin={coin}
                processing={processing}
                equippedId={equippedId}
                tryEquipped={tryEquippedId === item.id}
                onPurchase={handlePurchase}
                onEquip={handleEquip}
                onTry={(product) =>
                  setTryEquippedId((prev) => (prev === product.id ? null : product.id))
                }
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#eee4dbff' },
  row: { flex: 1, flexDirection: 'row' },
  left: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  right: { flex: 1, paddingLeft: 8 },

  characterContainer: {
    width: 300,
    height: 300,
    position: 'relative', // absolute 자식 기준
  },

  character: {
    width: '100%',
    height: '100%',
  },
});
