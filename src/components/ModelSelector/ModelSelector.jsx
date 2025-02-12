import "./ModelSelector.css";
import selectorUrl from "./selector.svg";
import webUrl from "./web.svg";

import { useState, useEffect } from "react";
import ProviderLogo from "../ProviderLogo/ProviderLogo";

import modelsData from "../../data/models.json";

const ModelSelector = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel }) => {

  const [inSearchMode, setInSearchMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const selectedModelName = modelsData[selectedModel].displayName;
  const modelProvider = modelsData[selectedModel].provider;

  const handleInternetClick = () => {
    if (!inSearchMode) {
      setSelectedModel("sonar");
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
  
    setDropdownOpen(false);
  };
  

  return (
    <>
      <div className="model-selector unselectable" onClick={() => setDropdownOpen(!dropdownOpen)} onBlur={() => setDropdownOpen(false)} tabIndex="0">
        { /*<img className={`model-icon ${providerClassNames[modelProvider]}`} src={providerLogos[modelProvider]} alt="OpenAI" draggable="false" /> */ }
        <ProviderLogo provider={modelProvider} horizontalMargins={true} />
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
                { /* <img className={`model-icon ${providerClassNames[modelsData[model].provider]}`} src={providerLogos[modelsData[model].provider]} alt="OpenAI" draggable="false" /> */ }
                <ProviderLogo provider={modelsData[model].provider} horizontalMargins={true} />
                {modelsData[model].displayName}
            </div>
          )
        })}
      </div>
    </>
  )
};

export default ModelSelector;