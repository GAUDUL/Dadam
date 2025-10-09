import { useCallback, useEffect, useState } from "react";
import { getUserInfo, getUserShopInfo } from "../api/userApi";
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


}