import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useHomeNavigation } from '../../../navigation/useAppNavigation';
import { getUserInfo } from '../api/userApi';

const PRODUCTS = [
  { id: 1, name: '상품 1', price: 100 },
  { id: 2, name: '상품 2', price: 200 },
  { id: 3, name: '상품 3', price: 300 },
  { id: 4, name: '상품 4', price: 400 },
  { id: 5, name: '상품 5', price: 500 },
  { id: 6, name: '상품 6', price: 600 },
];

export default function Shop() {

  const navigation = useHomeNavigation();
  const [coin,setCoin] = useState();

    const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo();
      setCoin(data.coin);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchUserInfo();
  },[]);
  
  const handleBack = async () => {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <Text style={styles.coin}>보유 코인: {coin}</Text>

      <TouchableOpacity onPress={handleBack} style={styles.back}>
        <Text>돌아가기</Text>
      </TouchableOpacity>
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