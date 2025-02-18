import "./ConversationName.css";

const ConversationName = ({ conversationName }) => {


  return (
    <div className="conversation-name-container">
      <div className="conversation-name">{conversationName}</div>
    </div>
  )
}   

export default ConversationName;