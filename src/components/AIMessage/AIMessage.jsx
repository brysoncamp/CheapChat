import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import RenderMarkdown from "../RenderMarkdown/RenderMarkdown";
import AIMessageOptions from "../AIMessageOptions/AIMessageOptions";
import ProviderLogo from "../ProviderLogo/ProviderLogo";
import CitationsContainer from "../CitationsContainer/CitationsContainer";

import "./AIMessage.css";

import modelsData from "../../data/models.json";
import { isMobile } from "react-device-detect";

const AIMessage = ({ message, citations, model, isLoading = false }) => {

  const modelName = modelsData[model]?.displayName;
  const provider = modelsData[model]?.provider;
  
  return (
    <div className="ai-message-wrapper">
      <TooltipWrapper info={modelName} className="ai-name-tooltip" position="E" offset={-120} mobileShow={false}>
        <div className="ai-message-icon unselectable">
          <ProviderLogo provider={provider} />
        </div>
        { isMobile && <div className="ai-message-model-name">{modelName}</div>}
      </TooltipWrapper>
      <div className="ai-message-container">
        <CitationsContainer citations={citations} />
        <RenderMarkdown text={message} citations={citations} isLoading={isLoading} />
        { !isLoading && <AIMessageOptions text={message} /> }
      </div>
    </div>
  )
}
  
export default AIMessage;