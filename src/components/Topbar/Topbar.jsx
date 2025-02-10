import "./Topbar.css";
import ModelSelector from "../ModelSelector/ModelSelector";

const Topbar = ({ selectedModel, useSelectedModel }) => { 
    return (
        <div className="topbar">
            <ModelSelector selectedModel={selectedModel} useSelectedModel={useSelectedModel} />
        </div>
    )
}

export default Topbar;