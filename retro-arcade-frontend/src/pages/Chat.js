import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const Chat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("User" + Math.floor(Math.random() * 1000));

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = over(socket);
    client.connect({}, () => {
      console.log("Connected to WebSocket");
      client.subscribe("/topic/public", (msg) => {
        const received = JSON.parse(msg.body);
        setMessages((prev) => [...prev, received]);
      });
    });
    setStompClient(client);
  }, []);

  const sendMessage = () => {
    if (stompClient && message.trim()) {
      const chatMessage = { sender: username, content: message };
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "2rem", color: "#fff", background: "#0b0c10", minHeight: "100vh" }}>
      <h2>💬 Live Chat</h2>
      <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #66fcf1", padding: "1rem", marginBottom: "1rem" }}>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.sender}:</strong> {m.content}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ padding: "0.5rem", width: "70%" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "1rem", padding: "0.5rem" }}>Send</button>
    </div>
  );
};

export default Chat;