import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

import "./WebSocketChat.css";
import openaiUrl from "./openai.svg";

import UserMessageOptions from "../UserMessageOptions/UserMessageOptions";
import AIMessageOptions from "../AIMessageOptions/AIMessageOptions";

const WEBSOCKET_URL = "wss://ws.cheap.chat";

const WebSocketChat = forwardRef(({ isStreaming, setIsStreaming }, ref) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const latestMessageRef = useRef("");
  const messageQueue = useRef([]);
  const reconnectAttempts = useRef(0);

  const MAX_RETRIES = 5;

  const connectWebSocket = async () => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();
      const userId = session.tokens?.idToken?.payload?.sub;

      if (!token || !userId) {
        console.error("❌ No token or userId found, user must re-authenticate.");
        return;
      }

      const uniqueId = `${userId}-${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(uniqueId);

      const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}&sessionId=${uniqueId}`);

      ws.onopen = () => {
        console.log("✅ WebSocket Connected with sessionId:", uniqueId);
        setSocket(ws);
        reconnectAttempts.current = 0;

        while (messageQueue.current.length > 0) {
          const pendingMessage = messageQueue.current.shift();
          ws.send(JSON.stringify(pendingMessage));
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📩 Message Received:", data);

          if (data.text) {
            setCurrentMessage((prev) => {
              latestMessageRef.current = prev + data.text;
              return latestMessageRef.current;
            });
          }

          if (data.done || data.timeout || data.canceled) {

            setIsStreaming(false); // ✅ Stop streaming
            console.log("✅ AI Response Complete - Moving to Messages List");
            const finalMessage = latestMessageRef.current.trim();
            if (finalMessage) {
              setMessages((prev) => [...prev, { sender: "ai-message", text: finalMessage }]);
            }
            setCurrentMessage("");
            latestMessageRef.current = "";
          }
        } catch (error) {
          console.error("❌ Error parsing message:", error);
        }
      };

      ws.onerror = (error) => console.error("❌ WebSocket Error:", error);

      ws.onclose = () => {
        console.log("🔴 WebSocket Disconnected");
        setSocket(null);
        attemptReconnect();
      };

      setSocket(ws);
    } catch (error) {
      console.error("❌ WebSocket Auth Error:", error);
      attemptReconnect();
    }
  };

  const attemptReconnect = () => {
    if (reconnectAttempts.current >= MAX_RETRIES) {
      console.error("❌ Max reconnect attempts reached. Stopping reconnect attempts.");
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
    reconnectAttempts.current += 1;

    console.log(`🔄 Attempting to reconnect WebSocket in ${delay / 1000} seconds...`);
    setTimeout(connectWebSocket, delay);
  };

  const sendMessage = (message) => {
    if (message.trim()) {
      const payload = { action: "openai", message, sessionId };
      console.log("📤 Queueing Message:", payload);
      setMessages((prev) => [...prev, { sender: "user-message", text: message }]);

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload));
      } else {
        messageQueue.current.push(payload);
        if (!socket || socket.readyState === WebSocket.CLOSED) {
          attemptReconnect();
        }
      }
    }
  };

  const cancelMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("🚫 Sending cancel request...");
      socket.send(JSON.stringify({ action: "cancel", sessionId }));
    }
  };
  

  useEffect(() => {
    connectWebSocket();
  }, []);

  useImperativeHandle(ref, () => ({
    sendMessage,
    cancelMessage,
  }));

  return (
    <div className="messages-container">
      {messages.map((msg, i) => (
        <div className="message-container" key={i}>
          <div className="message-container-inner">
            {msg.sender === "user-message" ? (
              <div className="user-message-container">
                <p className="message user-message">{msg.text}</p>
                <UserMessageOptions />
              </div>
            ) : (
              <div className="ai-message-wrapper">
                <div className="ai-message-icon">
                  <img src={openaiUrl} alt="OpenAI" />
                </div>
                <div className="ai-message-container">
                  <p className="message ai-message">{msg.text}</p>
                  <AIMessageOptions />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      {(currentMessage || isStreaming) && (
        <div className="message-container">
          <div className="message-container-inner">
            <div className="ai-message-wrapper">
              <div className="ai-message-icon">
                <img src={openaiUrl} alt="OpenAI" />
              </div>
              <div className="ai-message-container">
                <p className="message ai-message">
                  {currentMessage || "\u00A0"}
                  <span className="loading-circle"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default WebSocketChat;
