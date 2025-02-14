import { useState, useEffect } from "react";

import { useAuth } from '../../components/AuthProvider/AuthProvider';
import ChatInterface from "../../components/ChatInterface/ChatInterface";

const Page = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, rootPage = false }) => {

  const [messages, setMessages] = useState([]);

  if (rootPage) {
    return (
      <ChatInterface selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel} messages={messages} setMessages={setMessages} aiExplorer={true} />
    );
  }


  const [isChatPage, setIsChatPage] = useState(true);
  const [isErrorPage, setIsErrorPage] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const { ensureValidToken } = useAuth();

  useEffect(() => {
    console.log(window.location.pathname);
    // check if pathname start with /d/
    if (window.location.pathname.startsWith("/c/")) {
      setIsChatPage(true);
      const lastPath = window.location.pathname.split('/').filter(Boolean).pop();
      setConversationId(lastPath);
      console.log("Setting conversationId:", lastPath);

    } else {  
      setIsErrorPage(true);
    }

  }, []);
  
  useEffect(() => {
    if (conversationId) {
      console.log("hello");
      const fetchData = async () => {
        try {

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

          console.log("response", response);

          const data = await response.json();
          const messages = data.messages;
          const messagesArray = [];

          messages.forEach(msg => {
            messagesArray.push({ sender: "user-message", text: msg.query });
            messagesArray.push({ sender: msg.model, text: msg.response });
          });

          setMessages(messagesArray);

        } catch (error) {
          //setError(error);
        }
      };

      fetchData();
    }
  }, [conversationId]);

  return (
    <>
      {isChatPage && <ChatInterface key={conversationId} selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel} messages={messages} setMessages={setMessages} windowConversationId={conversationId} />}
      {isErrorPage && <div>404</div>}
    </>
  );
}

export default Page;
