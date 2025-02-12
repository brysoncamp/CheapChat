import { useState } from "react";

import ChatInterface from "../../components/ChatInterface/ChatInterface";

const Page = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel }) => {

  const [messages, setMessages] = useState([]);

  return (
    <ChatInterface selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel} messages={messages} setMessages={setMessages} aiExplorer={true} />
  );
};

export default Page;
