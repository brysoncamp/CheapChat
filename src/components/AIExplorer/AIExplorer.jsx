import "./AIExplorer.css";
import modelsData from "../../data/models.json";

const AIExplorer = ({ hasStreamed, selectedModel, setSelectedModel }) => {

  const modelsArray = Object.entries(modelsData);
  console.log(modelsArray);

  return (
    <div className={`ai-explorer-container ${hasStreamed ? "display-none" : ""}`}>
      <div className="ai-explorer-container-inner">
        <h1 className="ai-explorer-title">Choose your AI.</h1>
        <div className="pinned-ais">
          {modelsArray.map((model, index) => (
            <div className={`ai-model-option ${model[0]== selectedModel ? "selected-ai-model-option" : ""} unselectable`} key={index} onClick={() => setSelectedModel(model[0])}>
              {model[1].displayName}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIExplorer;