import { useState } from "react";

import ChatInterface from "../../components/ChatInterface/ChatInterface";
import useConversation from "../../hooks/useConversation";

const Page = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, rootPage }) => {

  const { messages, setMessages, conversationId, isChatPage, isErrorPage } = useConversation();

  /*
  if (rootPage) {
    return (
      <ChatInterface selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel} messages={messages} setMessages={setMessages} aiExplorer={true} />
    );
  }*/
 

  return (
    isChatPage ? (
      <ChatInterface
        key={conversationId}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        lastNonSearchSelectedModel={lastNonSearchSelectedModel}
        setLastNonSearchSelectedModel={setLastNonSearchSelectedModel}
        messages={messages}
        setMessages={setMessages}
        windowConversationId={conversationId}
      />
    ) : (
      <div>
        <h1>Search</h1>
      </div>
    )
  );
    
};

export default Page;
