package com.retroarcade.retro_arcade_marketplace.controller;

import com.retroarcade.retro_arcade_marketplace.model.Payment;
import com.retroarcade.retro_arcade_marketplace.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    // Constructor-based dependency injection
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    /**
     * Endpoint to capture and log payment info sent from frontend
     * Example payload:
     * {
     *   "orderID": "PAYPAL_ORDER_ID",
     *   "payerEmail": "customer@example.com",
     *   "amount": "19.99",
     *   "currency": "USD",
     *   "gameId": "1"
     * }
     */
    @PostMapping("/capture")
    public ResponseEntity<String> capturePayment(@RequestBody Map<String, String> payload) {
        try {
            // Extract data from request payload
            String orderId = payload.get("orderID");
            String payerEmail = payload.get("payerEmail");
            Double amount = Double.valueOf(payload.getOrDefault("amount", "0.0"));
            String currency = payload.getOrDefault("currency", "USD");
            String status = "COMPLETED";
            Long gameId = payload.containsKey("gameId") ? Long.valueOf(payload.get("gameId")) : null;

            // Create and save Payment entity
            Payment payment = new Payment();
            payment.setTransactionId(orderId);
            payment.setPayerEmail(payerEmail);
            payment.setAmount(amount);
            payment.setCurrency(currency);
            payment.setStatus(status);
            payment.setGameId(gameId);
            payment.setPaymentTime(LocalDateTime.now());

            paymentService.savePayment(payment);

            // Log to backend console
            System.out.println("✅ Payment recorded: " + orderId + " | " + payerEmail + " | $" + amount);

            return ResponseEntity.ok("Payment successfully recorded for Order ID: " + orderId);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Error capturing payment: " + e.getMessage());
        }
    }

    /**
     * Retrieve all logged payments from database
     */
    @GetMapping("/logs")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }
}
