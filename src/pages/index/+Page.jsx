import "./Page.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import WebSocketChat from "../../components/WebSocketChat/WebSocketChat";
import { useState, useRef } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const webSocketChatRef = useRef(null); // ✅ Create ref for WebSocketChat

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
      <div className="body">
        <WebSocketChat ref={webSocketChatRef} isStreaming={isStreaming} setIsStreaming={setIsStreaming} /> {/* ✅ Pass ref */}
      </div>
      <InputContainer inputValue={inputValue} setInputValue={setInputValue} isStreaming={isStreaming} onSend={handleSendMessage} onStop={handleStopMessage} />
    </div>
  );
};

export default Page;
