import TextToSpeechButton from "../TextToSpeechButton/TextToSpeechButton";
import CopyButton from "../CopyButton/CopyButton";

const AIMessageOptions = ({ text }) => {
    return (
        <div className="message-options ai-message-options">
            <TextToSpeechButton text={text} />
            <CopyButton text={text} />
        </div>
    );
};
  
export default AIMessageOptions;