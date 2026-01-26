package com.example.backend.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShopDataResponse {
    private int coin;
    private int[] owned;

    public ShopDataResponse(int coin, int[] owned) {
        this.coin = coin;
        this.owned = owned;
    }
}
