import "./Topbar.css";
import ModelSelector from "../ModelSelector/ModelSelector";
import SignUpButton from "../SignUpButton/SignUpButton";
import ConversationName from "../ConversationName/ConversationName";

import { useAuth } from "../AuthProvider/AuthProvider";

const Topbar = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, conversationName }) => { 

  const { user, hasSignedInBefore, isAuthLoading } = useAuth();

  return (
    <div className="topbar">
      <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel}/>
      <ConversationName conversationName={conversationName} />
      {(!user && !isAuthLoading) ? <SignUpButton signUp={!hasSignedInBefore} /> : <div>EXAMPLE</div>}
    </div>
  )
}

export default Topbar;