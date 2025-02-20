import ChatInterface from "../ChatInterface/ChatInterface";
import useConversation from "../../hooks/useConversation";

const ChatOrPage = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, pageContent }) => {
  const { messages, setMessages, conversationId, isChatPage } = useConversation();

  return isChatPage ? (
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
    pageContent
  );
};

export default ChatOrPage;
