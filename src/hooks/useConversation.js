import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider/AuthProvider";

export const getConversationId = () => {
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/c/")) {
    return window.location.pathname.split("/").filter(Boolean).pop();
  }
  return null;
};


const useConversation = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isChatPage, setIsChatPage] = useState(false);
  const [isErrorPage, setIsErrorPage] = useState(false);

  const { user, ensureValidToken } = useAuth();

  // Detect conversation ID from URL
  useEffect(() => {
    const conversationId = getConversationId();
    if (conversationId) {
      setConversationId(conversationId);
      setIsChatPage(true);
    } else {
      setIsErrorPage(true);
    }
  }, []);

  // Fetch conversation messages
  useEffect(() => {
    if (!conversationId) return;

    const fetchData = async () => {
      try {
        console.log("Fetching conversation:", conversationId);
        console.log("USER", user);

        const token = await ensureValidToken();
        console.log("Token received:", token);

        if (!token) {
          throw new Error("Unauthorized: Failed to get authentication token.");
        }

        const response = await fetch(`https://api.cheap.chat/chat?conversationId=${conversationId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Origin: window.location.origin,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const messagesArray = [];

        data.messages.forEach((msg) => {
          messagesArray.push({ sender: "user-message", text: msg.query });
          messagesArray.push({ sender: msg.model, text: msg.response });
        });

        setMessages(messagesArray);
      } catch (error) {
        console.error("Error fetching conversation:", error);
        setIsErrorPage(true);
      }
    };

    fetchData();
  }, [conversationId]);

  return { messages, setMessages, conversationId, isChatPage, isErrorPage };
};

export default useConversation;
