import copyUrl from "./copy.svg";
import editUrl from "./edit.svg";

const UserMessageOptions = () => {
    return (
        <div className="message-options user-message-options">
            <div className="message-button unselectable">
                <img src={editUrl} style={{ height: "1rem" }} alt="Edit" draggable="false" />
            </div>
            <div className="message-button unselectable">
                <img src={copyUrl} style={{ height: "1rem" }} alt="Copy" draggable="false" />
            </div>
        </div>
    );
};
  
export default UserMessageOptions;