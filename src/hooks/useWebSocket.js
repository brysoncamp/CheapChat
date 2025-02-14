import { useState, useEffect, useRef } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import modelsData from "../data/models.json";

const WEBSOCKET_URL = "wss://ws.cheap.chat";
const MAX_RETRIES = 5;

const useWebSocket = (setIsStreaming, selectedModel, setLastModel, setMessages, conversationId, setConversationId) => {
  const [socket, setSocket] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  
  const messageQueue = useRef([]);
  const reconnectAttempts = useRef(0);
  const latestMessageRef = useRef("");
  const lastModelRef = useRef(null);
  const latestSocketRef = useRef(null); // Tracks the latest WebSocket connection

  const connectWebSocket = async () => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();
      const userId = session.tokens?.idToken?.payload?.sub;

      if (!token || !userId) {
        console.error("❌ No token or userId found, user must re-authenticate.");
        return;
      }

      const uniqueId = `${userId}-${Math.random().toString(36).slice(2, 11)}`;
      setSessionId(uniqueId);

      // Close the previous WebSocket before opening a new one
      if (latestSocketRef.current) {
        latestSocketRef.current.close();
      }

      const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}&sessionId=${uniqueId}`);
      latestSocketRef.current = ws; // Track the latest socket

      ws.onopen = () => {
        console.log("✅ WebSocket Connected with sessionId:", uniqueId);
        setSocket(ws);
        reconnectAttempts.current = 0;

        while (messageQueue.current.length > 0) {
          ws.send(JSON.stringify(messageQueue.current.shift()));
        }
      };

      ws.onmessage = (event) => {
        try {
          if (ws !== latestSocketRef.current) return; // Ignore old connections

          const data = JSON.parse(event.data);
          console.log("📩 Message Received:", data);

          if (data.conversationId) {
            window.history.replaceState({}, "", `/c/${data.conversationId}`);
            setConversationId(data.conversationId);
          }

          if (data.text) {
            setCurrentMessage((prev) => {
              latestMessageRef.current = prev + data.text;
              return latestMessageRef.current;
            });
          }

          if (data.message) {
            setCurrentMessage(data.message);
            latestMessageRef.current = data.message;
          }

          if (data.done || data.timeout || data.canceled) {
            setTimeout(() => {
              console.log("setting ai-message", latestMessageRef.current);
              setIsStreaming(false);
              const finalMessage = latestMessageRef.current.trim();
              if (finalMessage) {
                setMessages((prev) => [...prev, { sender: lastModelRef.current, text: finalMessage }]);
              }
              setCurrentMessage("");
              latestMessageRef.current = ""; // Reset AFTER setting state
            }, 100);
          }
          
        } catch (error) {
          console.error("❌ Error parsing message:", error);
        }
      };

      ws.onerror = (error) => console.error("❌ WebSocket Error:", error);

      ws.onclose = () => {
        if (ws !== latestSocketRef.current) return; // Ignore old sockets closing
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
      console.error("❌ Max reconnect attempts reached.");
      return;
    }
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
    reconnectAttempts.current += 1;
    console.log(`🔄 Reconnecting in ${delay / 1000} seconds...`);
    setTimeout(connectWebSocket, delay);
  };

  const sendMessage = (message) => {
    if (message.trim()) {
      const modelName = modelsData[selectedModel].modelName;
      lastModelRef.current = selectedModel;
      setLastModel(selectedModel);
      const payload = { action: modelName, message, sessionId, conversationId };
      console.log("sending message", payload);
      setMessages((prev) => [...prev, { sender: "user-message", text: message }]);

      if (socket && socket === latestSocketRef.current && socket.readyState === WebSocket.OPEN) {
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
    if (socket && socket === latestSocketRef.current && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "cancel", sessionId }));
    }
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (latestSocketRef.current) {
        latestSocketRef.current.close(); // Close socket when component unmounts
      }
    };
  }, []);

  return { currentMessage, sendMessage, cancelMessage };
};

export default useWebSocket;
