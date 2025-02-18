import "./ModelSelector.css";
import selectorUrl from "./selector.svg";
import webUrl from "./web.svg";

import { useState, useEffect } from "react";
import ProviderLogo from "../ProviderLogo/ProviderLogo";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";

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
  
  // <TooltipWrapper />

  return (
    <>
      <div className="model-selector unselectable" onClick={() => setDropdownOpen(!dropdownOpen)} onBlur={() => setDropdownOpen(false)} tabIndex="0">
        <ProviderLogo provider={modelProvider} className="selector-logos" />
        { selectedModelName }
        <img className="selector-icon" src={selectorUrl} alt="dropdown" />
      </div>
      <TooltipWrapper info="Search the web" position="E" offset={12}>
        <div className={`internet-icon unselectable ${inSearchMode ? "internet-icon-enabled" : ""}`} onClick={handleInternetClick}>
          <img src={webUrl} alt="Internet" draggable="false" />
        </div>
      </TooltipWrapper>
      <div className={`model-selector-dropdown ${dropdownOpen ? "model-selector-dropdown-enabled" : ""}`}>
        {Object.keys(modelsData).map((model, index) => {
          return (
            <div key={index} className="model-selector-option" 
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onModelSelect(model)}>
                <ProviderLogo provider={modelsData[model].provider} className="selector-logos" />
                {modelsData[model].displayName}
            </div>
          )
        })}
      </div>
    </>
  )
};

export default ModelSelector;