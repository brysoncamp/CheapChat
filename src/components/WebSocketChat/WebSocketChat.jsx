import { forwardRef, useImperativeHandle, useState } from "react";

import MessagesContainer from "../MessagesContainer/MessagesContainer";
import useWebSocket from "../../hooks/useWebSocket";
import useScrollManager from "../../hooks/useScrollManager";

const WebSocketChat = forwardRef(({ bodyRef, isStreaming, setIsStreaming, hasStreamed, selectedModel, messages, setMessages, aiExplorer }, ref) => {
  const [lastModel, setlastModel] = useState(null);
  const { currentMessage, sendMessage, cancelMessage } = useWebSocket(setIsStreaming, selectedModel, setlastModel, setMessages);
  useScrollManager(bodyRef, messages, currentMessage);

  useImperativeHandle(ref, () => ({
    sendMessage,
    cancelMessage,
  }));

  return (
    (hasStreamed || !aiExplorer) && <MessagesContainer messages={messages} currentMessage={currentMessage} isStreaming={isStreaming} lastModel={lastModel} />
  );
});

export default WebSocketChat;
