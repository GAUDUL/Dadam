import api from "../../../shared/api";

export async function getUserInfo(){
  const response = await api.get('/user/user-info');
  return response.data;
}

export async function getUserShopInfo(){
    const res = await api.get('/user/shop-data');
    return res.data;
}

export async function requestPurchase(price:number, id:number){
    const res = await api.post('/user/shop-purchase',{
        price: price,
        productId: id,
    })
    return res.data;
}