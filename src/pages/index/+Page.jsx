import ChatInterface from "../../components/ChatInterface/ChatInterface";
import useConversation from "../../hooks/useConversation";

const Page = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, rootPage = true }) => {
  const { messages, setMessages, conversationId, isChatPage, isErrorPage, title } = useConversation();

  console.log("Rendering page on the /index/ route");
  console.log("Root Page", rootPage);

  if (rootPage || rootPage === null) {
    return (
      <ChatInterface
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        lastNonSearchSelectedModel={lastNonSearchSelectedModel}
        setLastNonSearchSelectedModel={setLastNonSearchSelectedModel}
        messages={messages}
        setMessages={setMessages}
        aiExplorer={true}
        title={title}
      />
    );
  }

  return (
    <>
      {isChatPage && (
        <ChatInterface
          key={conversationId}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          lastNonSearchSelectedModel={lastNonSearchSelectedModel}
          setLastNonSearchSelectedModel={setLastNonSearchSelectedModel}
          messages={messages}
          setMessages={setMessages}
          windowConversationId={conversationId}
          title={title}
        />
      )}
      {/*isErrorPage && <div>404</div>*/}
    </>
  );
};

export default Page;
