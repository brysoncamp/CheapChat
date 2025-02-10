import "./Page.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import WebSocketChat from "../../components/WebSocketChat/WebSocketChat";
import Notice from "../../components/Notice/Notice";
import Topbar from "../../components/Topbar/Topbar";

import { useState, useRef } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedModel, useSelectedModel] = useState("GPT-4o");  

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

  return (
    <div className="page">
      <div className="body" ref={bodyRef}>
        <Topbar selectedModel={selectedModel} useSelectedModel={useSelectedModel} />
        <WebSocketChat ref={webSocketChatRef} bodyRef={bodyRef} isStreaming={isStreaming} setIsStreaming={setIsStreaming} /> {/* ✅ Pass ref */}
      </div>
      <InputContainer inputValue={inputValue} setInputValue={setInputValue} isStreaming={isStreaming} onSend={handleSendMessage} onStop={handleStopMessage} />
      <Notice inputValue={inputValue} />
    </div>
  );
};

export default Page;
