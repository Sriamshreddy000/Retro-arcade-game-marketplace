// src/components/GameChat.js
import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import "../styles/GameChat.css";

let stompClient = null;

const GameChat = ({ gameId, currentUserId, otherUserId, isAdmin }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
    connectWebSocket();
    return () => {
      if (stompClient) stompClient.deactivate();
    };
  }, []);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get(
        `/api/chat/product/${gameId}?senderId=${Number(currentUserId)}&receiverId=${Number(otherUserId)}`
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching chat history:", err);
    }
  };

  const connectWebSocket = () => {
    const socket = new SockJS("http://localhost:8080/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        setConnected(true);

        stompClient.subscribe("/topic/messages", (payload) => {
          const message = JSON.parse(payload.body);
          if (
            message.productId === gameId &&
            ((message.senderId === currentUserId && message.receiverId === otherUserId) ||
              (message.senderId === otherUserId && message.receiverId === currentUserId))
          ) {
            setMessages((prev) => [...prev, message]);
          }
        });
      },
      onDisconnect: () => {
        console.warn("🔌 Disconnected from WebSocket");
        setConnected(false);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    stompClient.activate();
  };

  const handleSendMessage = () => {
    if (!connected) {
      console.warn("⚠️ Not connected to WebSocket");
      return;
    }

    if (newMessage.trim() === "") return;

    const messageObj = {
      senderId: currentUserId,
      receiverId: otherUserId,
      productId: gameId,
      content: newMessage,
    };

    stompClient.publish({
      destination: "/app/send",
      body: JSON.stringify(messageObj),
    });

    setNewMessage("");
  };

  const handleClearChat = async () => {
    try {
      await axios.delete(
        `/api/chat/clear?productId=${gameId}&senderId=${currentUserId}&receiverId=${otherUserId}`
      );
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear chat", err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">💬 Game Chat</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.senderId === currentUserId ? "sent" : "received"}`}
          >
            <div className="chat-content">{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={connected ? "Type your message..." : "Connecting..."}
          disabled={!connected}
        />
        <button onClick={handleSendMessage} disabled={!connected || newMessage.trim() === ""}>
          Send
        </button>

        {isAdmin && (
          <button className="clear-btn" onClick={handleClearChat}>
            🗑 Clear Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default GameChat;