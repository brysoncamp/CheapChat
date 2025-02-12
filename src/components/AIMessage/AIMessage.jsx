import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import RenderMarkdown from "../RenderMarkdown/RenderMarkdown";
import AIMessageOptions from "../AIMessageOptions/AIMessageOptions";
import ProviderLogo from "../ProviderLogo/ProviderLogo";
import "./AIMessage.css";

import modelsData from "../../data/models.json";

const AIMessage = ({ message, model, isLoading = false }) => {

  const modelName = modelsData[model]?.displayName;
  const provider = modelsData[model]?.provider;
  
  return (
    <div className="ai-message-wrapper">
      <TooltipWrapper info={modelName} className="ai-name-tooltip" position="W">
        <div className="ai-message-icon unselectable">
          <ProviderLogo provider={provider} />
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