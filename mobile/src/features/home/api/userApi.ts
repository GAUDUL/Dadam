import api from "../../../shared/api";

export async function getUserInfo(){
  const response = await api.get('/user/user-info');
  return response.data;
}

export async function getUserShopInfo(){
    const res = await api.get('/user/shop-data');
    return res.data;
}