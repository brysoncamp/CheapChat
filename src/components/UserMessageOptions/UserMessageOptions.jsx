import editUrl from "./edit.svg";
import CopyButton from "../CopyButton/CopyButton";


const UserMessageOptions = ({ text }) => {
    return (
        <div className="message-options user-message-options">
            <div className="message-button unselectable">
                <img src={editUrl} style={{ height: "1.125rem" }} alt="Edit" draggable="false" />
            </div>
            <CopyButton text={text} />
        </div>
    );
};
  
export default UserMessageOptions;