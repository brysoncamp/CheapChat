import { forwardRef, useImperativeHandle } from "react";

import MessagesContainer from "../MessagesContainer/MessagesContainer";
import useWebSocket from "../../hooks/useWebSocket";
import useScrollManager from "../../hooks/useScrollManager";

const WebSocketChat = forwardRef(({ bodyRef, isStreaming, setIsStreaming, hasStreamed }, ref) => {

  const { messages, currentMessage, sendMessage, cancelMessage } = useWebSocket(setIsStreaming);
  useScrollManager(bodyRef, messages, currentMessage);

  useImperativeHandle(ref, () => ({
    sendMessage,
    cancelMessage,
  }));

  return (
    hasStreamed && <MessagesContainer messages={messages} currentMessage={currentMessage} isStreaming={isStreaming} />
  );
});

export default WebSocketChat;
