package com.example.backend.domain.user;

import com.example.backend.domain.user.dto.SignupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
//import com.example.backend.global.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
   private final PasswordEncoder passwordEncoder;

   //회원가입
   public void signup(SignupRequest signupRequest) {
       if(userRepository.existsById(signupRequest.getUserId())){
           throw new RuntimeException("이미 존재하는 ID입니다");
       }

       String encodedPassword = passwordEncoder.encode(signupRequest.getPassword());

       User user = new User();
       user.setUserId(signupRequest.getUserId());
       user.setPassword(encodedPassword);
       user.setEmail(signupRequest.getEmail());
       user.setUsername(signupRequest.getUsername());
       user.setNativeLanguage(signupRequest.getNativeLanguage());

       userRepository.save(user);

   }
}
