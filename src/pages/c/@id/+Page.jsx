import { useState, useEffect } from "react";

import { useAuth } from '../../../components/AuthProvider/AuthProvider';
import ChatInterface from "../../../components/ChatInterface/ChatInterface";

const Page = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel }) => {
  const [conversationId, setConversationId] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [messages, setMessages] = useState([]);

  const { ensureValidToken } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastPath = window.location.pathname.split('/').filter(Boolean).pop();
      setConversationId(lastPath);
    }
  }, []);

  useEffect(() => {
    if (conversationId) {
      const fetchData = async () => {
        try {
          setLoading(true);

          const token = await ensureValidToken();
          if (!token) {
            throw new Error("Unauthorized: Failed to get authentication token.");
          }

          const response = await fetch(`https://api.cheap.chat/chat?conversationId=${conversationId}`, {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${token}`,
              "Origin": window.location.origin
            }
          });


          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const messages = data.messages;
          const messagesArray = [];
          messages.forEach(msg => {
            messagesArray.push({ sender: "user-message", text: msg.query });
            messagesArray.push({ sender: msg.model, text: msg.response });
            //messagesArray.push({ sender: "openai-gpt-4o-mini", text: msg.response });
          });
          setMessages(messagesArray);
          console.log("Messages:", messagesArray);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [conversationId]);

  return (
    <ChatInterface selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel} messages={messages} setMessages={setMessages} />
  );


  /*<div>
      <h1>Page ID: {conversationId || "Loading..."}</h1>
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error.message}</p>}
      {apiData && <pre>{JSON.stringify(apiData, null, 2)}</pre>}
    </div>*/
};

export default Page;
