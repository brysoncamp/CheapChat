import "./AIExplorer.css";
import modelsData from "../../data/models.json";
import { useState, useEffect, useRef } from "react";

const AIExplorer = ({ hasStreamed, selectedModel, setSelectedModel, setLastNonSearchSelectedModel }) => {
  const [hoveredModel, setHoveredModel] = useState("");
  const [delayedModel, setDelayedModel] = useState(selectedModel);
  const [upcomingModel, setUpcomingModel] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const modelsArray = Object.entries(modelsData);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    const nextModel = hoveredModel || selectedModel;
    if (nextModel !== delayedModel || nextModel !== upcomingModel) {
      setIsFading(true);
      setUpcomingModel(nextModel);
      setTimeout(() => {
        setDelayedModel(nextModel);
        setIsFading(false);
      }, 200);
    }
  }, [hoveredModel, selectedModel]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const hoveredElement = event.target;

      if (!hoveredElement.closest(".ai-model-option")) {
        setHoveredModel("");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const onModelSelection = (modelKey) => {
    if (modelKey !== selectedModel) {
      setSelectedModel(modelKey);
    }
    console.log("model category", modelsData[modelKey].category);
    if (!modelsData[modelKey].category.includes("Search")) {
      setLastNonSearchSelectedModel(modelKey);
    }
  };

  return (
    <div className={`ai-explorer-container ${hasStreamed ? "display-none" : ""}`}>
      <div className="ai-explorer-container-inner">
        <div className="ai-explorer-options-container">
          <h1 className="ai-explorer-title">Choose your AI.</h1>
          <div className="pinned-ais">
            {modelsArray.map(([modelKey, modelData]) => (
              <div 
                className={`ai-model-option ${modelKey === selectedModel ? "selected-ai-model-option" : ""} unselectable`} 
                key={modelKey} 
                onClick={() => onModelSelection(modelKey)}
                onMouseEnter={() => setHoveredModel(modelKey)}
              >
                <div className="ai-model-option-name">{modelData.displayName}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="ai-information-container">
          <h2 className={`ai-information-name ${isFading ? "fade-out" : "fade-in"}`}>
            {modelsData[delayedModel]?.displayName}
          </h2>
          <p className={`ai-information-description ${isFading ? "fade-out" : "fade-in"}`}>
            {modelsData[delayedModel]?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIExplorer;