package com.example.backend.domain.user;

import com.example.backend.domain.user.dto.PurchaseRequest;
import com.example.backend.domain.user.dto.ShopDataResponse;
import com.example.backend.domain.user.repository.UserProductRepository;
import com.example.backend.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProductRepository productRepository;
    private final UserProductRepository userProductRepository;

    public User getCurrentUserInfo(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional
    public void updateReward(int coin) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetails.getUser();

        User managedUser = userRepository.findById(user.getUserId()).get();
        managedUser.setCoin(user.getCoin() + coin);
    }

    public ShopDataResponse userShopData(String id) {

        int coin = userRepository.findById(id).get().getCoin();
        int[] owned = userProductRepository.findByUserId(id)
                .stream().mapToInt(UserProduct::getProductId).toArray();

        return new ShopDataResponse(coin,owned);
    }

    @Transactional
    public void updatePurchase(String id, PurchaseRequest req) {
        User user = userRepository.findById(id).get();
        int currentCoin = user.getCoin();
        int change = currentCoin - req.getPrice();

        UserProduct product = new UserProduct();
        product.setProductId(req.getProductId());
        product.setUserId(id);
        productRepository.save(product);

        user.setCoin(change);
    }

}
