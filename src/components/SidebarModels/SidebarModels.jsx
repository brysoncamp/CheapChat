import "./SidebarModels.css";
import { useState, useEffect } from "react";
import modelsData from "../../data/models.json";
import ProviderLogo from "../ProviderLogo/ProviderLogo";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import plusUrl from "./plus.svg";
import moreUrl from "./more.svg";
import { navigate } from "vike/client/router";

const SidebarModels = ({ isClosed, selectedModel, setSelectedModel, resetContent, setRootPage }) => {
  const [modelsCount, setModelsCount] = useState(5);
  const [isMoreModels, setIsMoreModels] = useState(true);
  const [displayedModels, setDisplayedModels] = useState(Object.keys(modelsData).slice(0, 5)); // Start with initial models

  const models = Object.keys(modelsData);
  const modelsLength = models.length;

  useEffect(() => {
    if (modelsCount >= modelsLength) {
      setIsMoreModels(false);
    } else {  
      setIsMoreModels(true);
    }
  }, [modelsCount, modelsLength]);

  const navigateToRoot = () => {
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
    }
    navigate("/");
    setRootPage(true);
    setTimeout(() => resetContent(), 0);
  };

  const newModel = (model) => {
    setSelectedModel(model);
    navigateToRoot();
  };

  const modelClick = (model) => {
    //console.log("is root or chat page", isRootOrChatPage);
    const pathname = window.location.pathname;
    if (pathname === "/" || pathname.startsWith("/c/")) {
      setSelectedModel(model);
    } else {
      newModel(model);
      console.log("should nav to root");
    }
  };

  const addMoreModelsWithDelay = () => {
    const newModels = models.slice(displayedModels.length, displayedModels.length + 5);
    
    newModels.forEach((model, index) => {
      setTimeout(() => {
        setDisplayedModels((prev) => [...prev, model]);
      }, index * 50); // 100ms delay between each model appearing
    });

    setModelsCount((prev) => prev + newModels.length);
  };

  return (    
    <div className={`sidebar-models ${isClosed ? "sidebar-models-closed" : ""}`}>
      <div className={`new-chat-button-background ${isClosed ? "new-chat-button-background-closed" : ""}`} onClick={navigateToRoot}>
        <TooltipWrapper className="align-start" info="New chat" position="E" offset={12} enabled={isClosed}>
          <div className="new-chat-button unselectable" onClick={navigateToRoot}>
            <img src={plusUrl} draggable="false"/>
            {!isClosed && <p>New chat</p>}
          </div>
        </TooltipWrapper>
      </div>
      {displayedModels.map((model, index) => (
        <TooltipWrapper key={index} info={modelsData[model].displayName} position="E" offset={8} enabled={isClosed}>
          <div className={`sidebar-model ${isClosed ? 'sidebar-model-closed' : ''} ${selectedModel === model ? 'sidebar-model-selected' : ''} unselectable`} onClick={() => modelClick(model)}>
            <ProviderLogo provider={modelsData[model].provider} className="sidebar-logos" />
            <p className="sidebar-model-names">{!isClosed ? modelsData[model].displayName : ""}</p>
            
            {!isClosed && 
              <TooltipWrapper info="New chat" position="E" offset={16}>
                <div className="new-chat-model-button" onClick={() => newModel(model)}>
                  <img src={plusUrl} draggable="false"/>
                </div>
              </TooltipWrapper>}
          </div>
        </TooltipWrapper>
      ))}
      {isMoreModels && (
        <TooltipWrapper info="More" position="E" offset={isClosed ? 4 : -74}>
          <div className="more-models-button">
            <img src={moreUrl} draggable="false" onClick={addMoreModelsWithDelay}/>
          </div>
        </TooltipWrapper>
      )}
    </div>
  );
};

export default SidebarModels;
