package com.example.backend.domain.user.repository;

import com.example.backend.domain.user.UserProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProductRepository extends JpaRepository<UserProduct, Long> {
    List<UserProduct> findByUserId(String userId);
}
