// src/pages/ProductChat.js
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import '../styles/Chat.css';

const socket = io("http://localhost:8080"); // Backend WebSocket server

const ProductChat = ({ productId, senderId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load chat history
    axios.get(`/api/chat/${productId}/${senderId}/${receiverId}`)
      .then((res) => {
        setChatMessages(res.data);
      })
      .catch((err) => console.error("Error loading chat history:", err));

    // Listen for messages
    socket.on("chat_message", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat_message");
    };
  }, [productId, senderId, receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const msgData = {
      content: message,
      senderId,
      receiverId,
      productId,
    };
    socket.emit("chat_message", msgData);
    setMessage("");
  };

  const handleClearChat = () => {
    axios
      .delete(`/api/chat/clear/${productId}/${senderId}/${receiverId}`)
      .then(() => setChatMessages([]))
      .catch((err) => console.error("Error clearing chat:", err));
  };

  return (
    <div className="chat-container">
      <h2>💬 Chat for Product #{productId}</h2>
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.senderId === senderId ? "sent" : "received"}`}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-controls">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
        <button className="clear-chat-btn" onClick={handleClearChat}>🗑️ Clear Chat</button>
      </div>
    </div>
  );
};

export default ProductChat;