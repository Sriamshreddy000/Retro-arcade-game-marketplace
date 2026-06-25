package com.retroarcade.retro_arcade_marketplace.service;

import com.retroarcade.retro_arcade_marketplace.model.Payment;
import com.retroarcade.retro_arcade_marketplace.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // Save a new payment to the database
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Fetch all payment records from the database
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
