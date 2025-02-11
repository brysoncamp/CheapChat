import "./ModelSelector.css";
import selectorUrl from "./selector.svg";
import webUrl from "./web.svg";

import { useState, useEffect } from "react";
import openaiUrl from "../../assets/providers/openai.svg";
import perplexityUrl from "../../assets/providers/perplexity.svg";

import modelsData from "../../data/models.json";

const ModelSelector = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel }) => {

  const [inSearchMode, setInSearchMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleInternetClick = () => {
    if (!inSearchMode) {
      setSelectedModel("perplexity-sonar");
    } else {
      setSelectedModel(lastNonSearchSelectedModel);
      console.log("Setting selected model: ", lastNonSearchSelectedModel);
    }
    setInSearchMode(!inSearchMode);
    
  };

  useEffect(() => {
    if (modelsData[selectedModel].category.includes("Search")) {
      setInSearchMode(true);
    } else {
      setInSearchMode(false);
    }
  }, [selectedModel]);

  const onModelSelect = (model) => {
    setSelectedModel(model);
    
    if (!modelsData[model].category.includes("Search")) {
      setLastNonSearchSelectedModel(model);
    }
  
    setDropdownOpen(false); // This was outside the function before, now it's inside
  };
  

  return (
    <>
      <div className="model-selector unselectable" onClick={() => setDropdownOpen(!dropdownOpen)} onBlur={() => setDropdownOpen(false)} tabIndex="0">
        <img className={`model-icon ${providerClassNames[modelProvider]}`} src={providerLogos[modelProvider]} alt="OpenAI" draggable="false" />
        { selectedModelName }
        <img className="selector-icon" src={selectorUrl} alt="dropdown" />
      </div>
      <div className={`internet-icon unselectable ${inSearchMode ? "internet-icon-enabled" : ""}`} onClick={handleInternetClick}>
        <img src={webUrl} alt="Internet" draggable="false" />
      </div>
      <div className={`model-selector-dropdown ${dropdownOpen ? "model-selector-dropdown-enabled" : ""}`}>
        {Object.keys(modelsData).map((model, index) => {
          return (
            <div key={index} className="model-selector-option" 
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onModelSelect(model)}>
                <img className={`model-icon ${providerClassNames[modelsData[model].provider]}`} src={providerLogos[modelsData[model].provider]} alt="OpenAI" draggable="false" />
                {modelsData[model].displayName}
            </div>
          )
        })}
      </div>
    </>
  )
};

export default ModelSelector;