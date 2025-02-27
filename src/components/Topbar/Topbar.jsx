import "./Topbar.css";
import ModelSelector from "../ModelSelector/ModelSelector";
import SignUpButton from "../SignUpButton/SignUpButton";
import ConversationName from "../ConversationName/ConversationName";

import { useAuth } from "../AuthProvider/AuthProvider";

import { isMobile } from "react-device-detect";

const Topbar = ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, conversationName, setConversationName }) => { 

  const { user, hasSignedInBefore, isAuthLoading } = useAuth();

  return (
    <div className="topbar">
      <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} lastNonSearchSelectedModel={lastNonSearchSelectedModel} setLastNonSearchSelectedModel={setLastNonSearchSelectedModel}/>
      {!isMobile && <ConversationName conversationName={conversationName} setConversationName={setConversationName}/>}
      {(!user && !isAuthLoading) ? <SignUpButton signUp={!hasSignedInBefore} /> : <div></div>}
    </div>
  )
}

export default Topbar;