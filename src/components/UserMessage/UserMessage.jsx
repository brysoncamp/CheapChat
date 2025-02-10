import UserMessageOptions from "../UserMessageOptions/UserMessageOptions";
import "./UserMessage.css";

const UserMessage = ({ message }) => {
  return (
    <div className="user-message-container">
      <p className="message user-message">
        {message}
      </p>
      <UserMessageOptions text={message} />
    </div>
  )
}

export default UserMessage;