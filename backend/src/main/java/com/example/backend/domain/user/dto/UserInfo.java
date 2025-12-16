package com.example.backend.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfo {
    private String userName;
    private String email;
    private String nativeLanguage;
    private Integer level;
    private Integer coin;
    private String role;

    public UserInfo(String username, String email, String nativeLanguage, Integer level, Integer coin, String role) {
        this.userName = username;
        this.email = email;
        this.nativeLanguage = nativeLanguage;
        this.level = level;
        this.coin = coin;
        this.role = role;
    }

    public UserInfo() {}
}
