import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

import "./WebSocketChat.css";

const WEBSOCKET_URL = "wss://ws.cheap.chat";

const WebSocketChat = forwardRef((props, ref) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]); // ✅ Stores full messages
  const [sessionId, setSessionId] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(""); // ✅ Buffer for AI messages

  const latestMessageRef = useRef(""); // ✅ Keeps track of AI message updates

  useEffect(() => {
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
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("📩 Message Received:", data);

            if (data.text) {
              setCurrentMessage((prev) => {
                latestMessageRef.current = prev + data.text; // ✅ Keep ref updated
                return latestMessageRef.current;
              });
            }

            if (data.done) {
              console.log("✅ AI Response Complete - Moving to Messages List");

              const finalMessage = latestMessageRef.current.trim();
              if (finalMessage) {
                setMessages((prev) => [...prev, { sender: "AI", text: finalMessage }]);
              }

              setCurrentMessage(""); // ✅ Clear buffer for next message
              latestMessageRef.current = ""; // ✅ Reset ref to prevent duplicates
            }
          } catch (error) {
            console.error("❌ Error parsing message:", error);
          }
        };

        ws.onerror = (error) => console.error("❌ WebSocket Error:", error);
        ws.onclose = () => console.log("🔴 WebSocket Disconnected");

        setSocket(ws);
      } catch (error) {
        console.error("❌ WebSocket Auth Error:", error);
      }
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  // ✅ Function to send a message
  const sendMessage = (message) => {
    if (socket && message.trim()) {
      const payload = { action: "openai", message, sessionId };
      console.log("📤 Sending Message:", payload);
      socket.send(JSON.stringify(payload));

      // ✅ Store the user's message separately
      setMessages((prev) => [...prev, { sender: "user", text: message }]);

      // ✅ Reset AI response buffer for new AI response
      setCurrentMessage("");
      latestMessageRef.current = ""; // ✅ Ensure AI message resets
    }
  };

  // ✅ Expose sendMessage to parent (Page.js)
  useImperativeHandle(ref, () => ({
    sendMessage,
  }));

  return (
    <div className="messages-container">
      {messages.map((msg, i) => (
        <p className={`message ${msg.sender}`} key={i}>{msg.text}</p> // ✅ Display messages properly
      ))}
      {currentMessage && <p>{currentMessage}</p>} {/* ✅ Show AI message while streaming */}
    </div>
  );
});

export default WebSocketChat;
