import copyUrl from "./copy.svg";
import editUrl from "./edit.svg";

const AIMessageOptions = () => {
    return (
        <div className="message-options ai-message-options unselectable">
            <div className="message-button">
                <img src={editUrl} style={{ height: "1rem" }} alt="Edit" draggable="false" />
            </div>
            <div className="message-button unselectable">
                <img src={copyUrl} style={{ height: "1rem" }} alt="Copy" draggable="false" />
            </div>
        </div>
    );
};
  
export default AIMessageOptions;