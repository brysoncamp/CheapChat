import "./ModelSelector.css";
import selectorUrl from "./selector.svg";
import webUrl from "./web.svg";


import openaiUrl from "../../assets/providers/openai.svg";
import perplexityUrl from "../../assets/providers/perplexity.svg";

import modelsData from "../../data/models.json";

const ModelSelector = ({ selectedModel, setSelectedModel }) => {

  const providerLogos = {
    OpenAI: openaiUrl,
    Perplexity: perplexityUrl
  };

  const providerClassNames = {
    OpenAI: "openai-icon",
    Perplexity: "perplexity-icon",
  };
  
  const selectedModelName = modelsData[selectedModel].displayName;
  const modelProvider = modelsData[selectedModel].provider;
  console.log(modelProvider);

  return (
    <>
      <div className="model-selector unselectable">
        <img className={`model-icon ${providerClassNames[modelProvider]}`} src={providerLogos[modelProvider]} alt="OpenAI" draggable="false" />
        { selectedModelName }
        <img className="selector-icon" src={selectorUrl} alt="dropdown" />
      </div>
      <div className="internet-icon unselectable">
        <img src={webUrl} alt="Internet" draggable="false" />
      </div>
    </>
  )
};

export default ModelSelector;