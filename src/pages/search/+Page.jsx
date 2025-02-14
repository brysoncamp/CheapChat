import { useState } from "react";

import ChatInterface from "../../components/ChatInterface/ChatInterface";


const Page = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, rootPage = false }) => {

  const [messages, setMessages] = useState([]);

  /*
  if (rootPage) {
    return (
      <ChatInterface selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel} messages={messages} setMessages={setMessages} aiExplorer={true} />
    );
  }*/

  return (
    <div>
      <h1>Search</h1>
    </div>
  );
};

export default Page;
