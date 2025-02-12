import InputContainer from "../InputContainer/InputContainer";
import WebSocketChat from "../WebSocketChat/WebSocketChat";
import Notice from "../Notice/Notice";
import Topbar from "../Topbar/Topbar";
import AIExplorer from "../AIExplorer/AIExplorer";
import "./ChatInterface.css";

import { useState, useRef, useEffect } from "react";

const ChatInterface = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, messages, setMessages, aiExplorer = false }) => {
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasStreamed, setHasStreamed] = useState(false);

  const webSocketChatRef = useRef(null); // ✅ Create ref for WebSocketChat
  const bodyRef = useRef(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    if (webSocketChatRef.current) {
      webSocketChatRef.current.sendMessage(inputValue);
      setIsStreaming(true);
    }
  
    setInputValue(""); 
  };

  const handleStopMessage = () => {
    if (webSocketChatRef.current) {
      webSocketChatRef.current.cancelMessage();
      setIsStreaming(false);  // ✅ Stop streaming
    }
  };

  useEffect(() => {
    if (isStreaming) {
      setHasStreamed(true);
    }
  }, [isStreaming]);


  return (
    <div className="page">
      <div className="body" ref={bodyRef}>
        <Topbar selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel} />
        {aiExplorer && <AIExplorer hasStreamed={hasStreamed} selectedModel={selectedModel} setSelectedModel={setSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel} /> }
        <WebSocketChat ref={webSocketChatRef} bodyRef={bodyRef} isStreaming={isStreaming} setIsStreaming={setIsStreaming} hasStreamed={hasStreamed} selectedModel={selectedModel} messages={messages} setMessages={setMessages} aiExplorer={aiExplorer} />
      </div>
      <InputContainer inputValue={inputValue} setInputValue={setInputValue} isStreaming={isStreaming} onSend={handleSendMessage} onStop={handleStopMessage} selectedModel={selectedModel} />
      <Notice inputValue={inputValue} />
    </div>
  );
};

export default ChatInterface;
