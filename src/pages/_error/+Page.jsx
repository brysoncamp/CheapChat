import ChatInterface from "../../components/ChatInterface/ChatInterface";
import useConversation from "../../hooks/useConversation";

const Page = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, rootPage = false }) => {
  const { messages, setMessages, conversationId, isChatPage, isErrorPage } = useConversation();

  console.log("Rendering page on the /error/ route");
  console.log("Root Page", rootPage);
  if (rootPage) {
    return (
      <ChatInterface
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        lastNonSearchSelectedModel={lastNonSearchSelectedModel}
        setLastNonSearchSelectedModel={setLastNonSearchSelectedModel}
        messages={messages}
        setMessages={setMessages}
        aiExplorer={true}
      />
    );
  }

  return (
    <>
      {(isChatPage || rootPage === null) && (
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
      )}
      {isErrorPage && <div>404</div>}
    </>
  );
};

export default Page;
