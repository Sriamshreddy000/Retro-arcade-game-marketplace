// ChatController.java
package com.retroarcade.retro_arcade_marketplace.controller;

import com.retroarcade.retro_arcade_marketplace.model.ChatMessage;
import com.retroarcade.retro_arcade_marketplace.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    // 🔁 Real-time message handler
    @MessageMapping("/send")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(ChatMessage message) {
        System.out.println("Received message: " + message.getContent()); // 👈 log here
        message.setTimestamp(LocalDateTime.now());
        return chatMessageRepository.save(message);
    }

    // 📩 Get messages for a product chat room
    @GetMapping("/product/{productId}")
    public List<ChatMessage> getMessagesForProduct(@PathVariable Long productId) {
        return chatMessageRepository.findByProductId(productId);
    }

    @GetMapping("/api/chat/product/{productId}")
    public List<ChatMessage> getChatByProductAndUsers(
            @PathVariable Long productId,
            @RequestParam String senderId,
            @RequestParam String receiverId
    ) {
        Long senderLong = Long.parseLong(senderId);
        Long receiverLong = Long.parseLong(receiverId);
        return chatMessageRepository.findByProductIdAndSenderIdAndReceiverId(productId, senderLong, receiverLong);
    }

    // ❌ Admin: Clear chat between buyer/seller for a product
    @DeleteMapping("/clear")
    public void clearChatBetweenUsers(@RequestParam Long productId,
                                      @RequestParam Long senderId,
                                      @RequestParam Long receiverId) {
        chatMessageRepository.deleteByProductIdAndSenderIdAndReceiverId(productId, senderId, receiverId);


    }
}