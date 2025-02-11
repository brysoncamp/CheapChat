import "./Topbar.css";
import ModelSelector from "../ModelSelector/ModelSelector";

const Topbar = ({ selectedModel, setSelectedModel }) => { 
    return (
        <div className="topbar">
            <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
        </div>
    )
}

export default Topbar;