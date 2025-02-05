import "./Page.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import WebSocketChat from "../../components/WebSocketChat/WebSocketChat";
import { useState, useRef } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const webSocketChatRef = useRef(null); // ✅ Create ref for WebSocketChat

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // ✅ Send message via WebSocketChat
    if (webSocketChatRef.current) {
      webSocketChatRef.current.sendMessage(inputValue);
    }

    setInputValue(""); // Clear input after sending
  };

  return (
    <div className="page">
      <div className="body">
        <WebSocketChat ref={webSocketChatRef} /> {/* ✅ Pass ref */}
      </div>
      <InputContainer inputValue={inputValue} setInputValue={setInputValue} onSend={handleSendMessage} />
    </div>
  );
};

export default Page;
