package com.example.backend.domain.user;

import com.example.backend.domain.user.dto.LoginRequest;
import com.example.backend.domain.user.dto.LoginResponse;
import com.example.backend.domain.user.dto.SignupRequest;
import com.example.backend.domain.user.dto.UserInfo;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<String> signup(@RequestBody SignupRequest signupRequest) {
        userService.signup(signupRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공");
    }

    @PostMapping("/sign-in")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        String token = userService.login(loginRequest);
        return ResponseEntity.ok(new LoginResponse(token));
    }

    @GetMapping("/user-info")
    public ResponseEntity<UserInfo> getUserInfo(@AuthenticationPrincipal UserDetailsImpl userDetails){
        if (userDetails==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = userDetails.getUser();

        UserInfo userInfo = new UserInfo(
                user.getUsername(),
                user.getEmail(),
                user.getNativeLanguage(),
                user.getLevel(),
                user.getCoin(),
                user.getRole().name()
        );

        return ResponseEntity.ok(userInfo);
    }
}
