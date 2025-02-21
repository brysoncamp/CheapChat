import ChatInterface from "../../components/ChatInterface/ChatInterface";
import useConversation from "../../hooks/useConversation";
import sadUrl from "./sad.svg";
import "./error.css";

const Page = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, rootPage = false }) => {
  const { messages, setMessages, conversationId, isChatPage, isErrorPage, title } = useConversation();

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
        title={title}
      />
    );
  }

  return (
    <>
      {((isChatPage || rootPage === null) && !isErrorPage) && (
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
      {isErrorPage && <div className="error-container">
        <img className="error-sad-face" src={sadUrl} alt="Sad face" />
        <div className="error-text">
          <h1>404</h1>
          <p>Page not found</p>
        </div>
      </div>}
    </>
  );
};

export default Page;
