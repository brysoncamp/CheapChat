import editUrl from "./edit.svg";
import CopyButton from "../CopyButton/CopyButton";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import "./UserMessageOptions.css";

const UserMessageOptions = ({ text }) => {
    return (
        <div className="message-options user-message-options">
            <TooltipWrapper info="Edit" className="user-message-button-tooltip">
                <div className="message-button unselectable">
                    <img src={editUrl} style={{ height: "1.125rem" }} alt="Edit" draggable="false" />
                </div>
            </TooltipWrapper>
            <TooltipWrapper info="Copy" className="user-message-button-tooltip">
                <CopyButton text={text} />
            </TooltipWrapper>
        </div>
    );
};
  
export default UserMessageOptions;