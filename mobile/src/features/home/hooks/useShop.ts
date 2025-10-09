import { useCallback, useEffect, useState } from "react";
import { getUserShopInfo, requestPurchase } from "../api/userApi";
import { Alert } from "react-native";

export function useShop(){
    const [coin, setCoin] = useState<number>(0);
    const [owned, setOwned] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<number|null>(null);
    
    const fetchShop = useCallback(async ()=>{
        try{
            setLoading(true);
            const shopData= await getUserShopInfo();
            setCoin(shopData.coin);
            setOwned(Array.isArray(shopData.owned)? shopData.owned : []);
        } catch(e){
            Alert.alert('정보 불러오는 중 문제 발생');
        } finally{
            setLoading(false);
        }
    },[]);

    useEffect(()=>{
        fetchShop();
    },[fetchShop]);

    const handlePurchase = useCallback(
        async(product: {id:number; name: string; price: number})=>{
            console.log('coin:', coin, typeof coin);
            if(owned.includes(product.id)) return;
            if(coin < product.price) {
                Alert.alert('코인이 부족합니다.');
                return;
            }
            Alert.alert(
                `${product.name} 구매`,
                `${product.price} 코인을 사용해 구매하시겠습니까?`,
                [
                    {text:'취소', style: 'cancel'},
                    {
                     text: `구매`,
                     onPress: async() => {
                        try{
                            setProcessing(product.id);
                            await requestPurchase(product.price, product.id);
                            await fetchShop();
                            Alert.alert('구매 완료');
                        } catch(e){
                            Alert.alert('구매 실패');
                        }finally{
                            setProcessing(null);
                        }
                     }
                    }
                ]
            )
        },
        [coin, owned, fetchShop]
    )

    return { coin, owned, loading, processing, fetchShop, handlePurchase };
}