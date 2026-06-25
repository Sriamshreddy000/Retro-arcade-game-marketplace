// ChatMessageRepository.java
package com.retroarcade.retro_arcade_marketplace.repository;

import com.retroarcade.retro_arcade_marketplace.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByProductId(Long productId);
    List<ChatMessage> findByProductIdAndSenderIdAndReceiverId(Long productId, Long senderId, Long receiverId);

    void deleteByProductIdAndSenderIdAndReceiverId(Long productId, Long senderId, Long receiverId);
}
