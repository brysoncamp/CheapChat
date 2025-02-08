import TextToSpeechButton from "../TextToSpeechButton/TextToSpeechButton";
import CopyButton from "../CopyButton/CopyButton";
import removeMarkdown from "remove-markdown";

const AIMessageOptions = ({ text }) => {
    const textForTTS = removeMarkdown(text);

    return (
        <div className="message-options ai-message-options">
            <TextToSpeechButton text={textForTTS} />
            <CopyButton text={text} />
        </div>
    );
};
  
export default AIMessageOptions;