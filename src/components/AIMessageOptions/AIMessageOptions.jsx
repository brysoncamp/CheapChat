import copyUrl from "./copy.svg";
import editUrl from "./edit.svg";

const AIMessageOptions = () => {
    return (
        <div className="message-options ai-message-options">
            <div className="message-button">
                <img src={editUrl} style={{ height: "1rem" }} alt="Edit" />
            </div>
            <div className="message-button">
                <img src={copyUrl} style={{ height: "1rem" }} alt="Copy" />
            </div>
        </div>
    );
};
  
export default AIMessageOptions;