import "./ModelSelector.css";
import selectorUrl from "./selector.svg";
import webUrl from "./web.svg";
import openaiUrl from "../../assets/providers/openai.svg";

const ModelSelector = ({ selectedModel, useSelectedModel }) => {
    
  return (
    <>
      <div className="model-selector unselectable">
        <img className="model-icon" src={openaiUrl} alt="OpenAI" draggable="false" />
        { selectedModel }
        <img className="selector-icon" src={selectorUrl} alt="dropdown" />
      </div>
      <div className="internet-icon unselectable">
        <img src={webUrl} alt="Internet" draggable="false" />
      </div>
    </>
  )
};

export default ModelSelector;