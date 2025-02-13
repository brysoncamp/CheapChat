import UserMessage from "../UserMessage/UserMessage";
import AIMessage from "../AIMessage/AIMessage";
import "./MessagesContainer.css";

const MessagesContainer = ({ messages, currentMessage, isStreaming, lastModel }) => {

  //console.log("MessagesContainer messages:", messages);
  
  return (
    <div className="messages-container">
      {messages.map((msg, i) => {
        //console.log("Message sender:", msg.sender);
        return (
          <div className="message-container" key={i}>
            <div className="message-container-inner">
              {msg.sender === "user-message" ? (
                <UserMessage message={msg.text} />
              ) : (
                <AIMessage message={msg.text} model={msg.sender} />
              )}
            </div>
          </div>
        );
      })}
      {(currentMessage || isStreaming) && (
        <div className="message-container">
          <div className="message-container-inner">
            <AIMessage message={currentMessage} model={lastModel} isLoading={true} />
          </div>
        </div>
      )}
      <div className="message-container-bottom"></div>
    </div>
  );
};

export default MessagesContainer;
