import UserMessage from "../UserMessage/UserMessage";
import AIMessage from "../AIMessage/AIMessage";
import "./MessagesContainer.css";

const MessagesContainer = ({ messages, currentMessage, isStreaming }) => {

  return (
    <div className="messages-container">
      {messages.map((msg, i) => {
        return (
          <div className="message-container" key={i}>
            <div className="message-container-inner">
              {msg.sender === "user-message" ? (
                <UserMessage message={msg.text} />
              ) : (
                <AIMessage message={msg.text} />
              )}
            </div>
          </div>
        );
      })}
      {(currentMessage || isStreaming) && (
        <div className="message-container">
          <div className="message-container-inner">
            <AIMessage message={currentMessage} isLoading={true} />
          </div>
        </div>
      )}
      <div className="message-container-bottom"></div>
    </div>
  );
};

export default MessagesContainer;
