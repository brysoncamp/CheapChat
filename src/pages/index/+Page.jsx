import "./Page.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import WebSocketChat from "../../components/WebSocketChat/WebSocketChat";
import Notice from "../../components/Notice/Notice";
import Topbar from "../../components/Topbar/Topbar";
import AIExplorer from "../../components/AIExplorer/AIExplorer";

import { useState, useRef, useEffect } from "react";

const Page = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel }) => {
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
        <AIExplorer hasStreamed={hasStreamed} selectedModel={selectedModel} setSelectedModel={setSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel} />
        <WebSocketChat ref={webSocketChatRef} bodyRef={bodyRef} isStreaming={isStreaming} setIsStreaming={setIsStreaming} hasStreamed={hasStreamed} />
      </div>
      <InputContainer inputValue={inputValue} setInputValue={setInputValue} isStreaming={isStreaming} onSend={handleSendMessage} onStop={handleStopMessage} selectedModel={selectedModel} />
      <Notice inputValue={inputValue} />
    </div>
  );
};

export default Page;
