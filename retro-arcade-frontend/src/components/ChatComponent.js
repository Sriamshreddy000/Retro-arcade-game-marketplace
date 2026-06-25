import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatComponent = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        // Create WebSocket connection to the backend
        const socket = new SockJS('http://localhost:8080/chat'); // WebSocket URL
        const client = Stomp.over(socket);

        // Connect to WebSocket server
        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            // Subscribe to messages
            client.subscribe('/topic/messages', (response) => {
                const newMessage = response.body;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });

        // Store the client for later use
        setStompClient(client);

        // Cleanup on unmount
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [stompClient]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            stompClient.send('/app/send', {}, message); // Send message to the backend
            setMessage('');
        }
    };

    return (
        <div>
            <h3>Live Chat</h3>
            <div style={{ marginBottom: '20px' }}>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                style={{ padding: '10px', width: '300px' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px 20px', marginLeft: '10px' }}>Send</button>
        </div>
    );
};

export default ChatComponent;
