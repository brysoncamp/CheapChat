import { useState } from "react";

import TextToSpeechButton from "../TextToSpeechButton/TextToSpeechButton";
import CopyButton from "../CopyButton/CopyButton";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import removeMarkdown from "remove-markdown";
import "./AIMessageOptions.css";

const AIMessageOptions = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const textForTTS = removeMarkdown(text);

  return (
    <div className="ai-message-options">
      <TooltipWrapper info={isSpeaking ? "Stop" : "Read"} className="ai-message-button-tooltip">
        <TextToSpeechButton text={textForTTS} isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking}/>
      </TooltipWrapper>
      <TooltipWrapper info="Copy" className="ai-message-button-tooltip">
        <CopyButton text={text} />
      </TooltipWrapper>
    </div>
  );
};
  
export default AIMessageOptions;