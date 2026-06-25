package com.retroarcade.retro_arcade_marketplace.repository;

import com.retroarcade.retro_arcade_marketplace.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
