import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import RenderMarkdown from "../RenderMarkdown/RenderMarkdown";
import AIMessageOptions from "../AIMessageOptions/AIMessageOptions";
import openaiUrl from "../../assets/providers/openai.svg";
import "./AIMessage.css";

const AIMessage = ({ message, isLoading = false }) => {
  return (
    <div className="ai-message-wrapper">
      <TooltipWrapper info="GPT-4o" className="ai-name-tooltip" position="W">
        <div className="ai-message-icon unselectable">
          <img src={openaiUrl} alt="OpenAI" draggable="false" />
        </div>
      </TooltipWrapper>
      <div className="ai-message-container">
        <RenderMarkdown text={message} isLoading={isLoading} />
        { !isLoading && <AIMessageOptions text={message} /> }
      </div>
    </div>
  )
}
  
export default AIMessage;