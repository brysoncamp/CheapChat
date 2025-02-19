import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";

const ConversationsContext = createContext();

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const { ensureValidToken } = useAuth();
  const [token, setToken] = useState(null);

  console.log("HELLO WORLD");

  const getToken = async () => {
    const token = await ensureValidToken();
    setToken(token);
  }

  getToken()

  useEffect(() => {

    if (!token) return;
    console.log("--------------------");
    console.log("Using this Token", token);


    const fetchConversations = async () => {
      const token = await ensureValidToken();
      console.log(token);
      if (!token) return;

      const response = await fetch("https://api.cheap.chat/conversations/recent", {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Origin": window.location.origin
        }
      });

      const data = await response.json();
      setConversations(data.conversations);
      setLastEvaluatedKey(data.lastEvaluatedKey);
    };

    fetchConversations();
  }, [token]);

  return (
    <ConversationsContext.Provider value={{ conversations, setConversations, lastEvaluatedKey }}>
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = () => useContext(ConversationsContext);
