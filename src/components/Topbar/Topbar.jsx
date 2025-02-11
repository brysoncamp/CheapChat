import "./Topbar.css";
import ModelSelector from "../ModelSelector/ModelSelector";

const Topbar = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel }) => { 
  return (
    <div className="topbar">
      <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel}/>
    </div>
  )
}

export default Topbar;