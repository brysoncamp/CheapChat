import { useRef, useEffect } from "react";
import plusUrl from "./plus.svg";
import sendUrl from "./send.svg";
import stopUrl from "../../assets/icons/stop.svg";
import TextInputArea from "../TextInputArea/TextInputArea";
import ActionButton from "../ActionButton/ActionButton";
import "./InputContainer.css";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";

const InputContainer = ({ inputValue, setInputValue, isStreaming, onSend, onStop, selectedModel }) => {
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  //console.log(selectedModel);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("button") && textAreaRef.current) {
        textAreaRef.current.focus();
      }
    };

    inputRef.current.addEventListener("click", handleClick);
    return () => inputRef.current.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="input-container" ref={inputRef}>
      <TooltipWrapper info="Attach" className="add-button-tooltip" position="N">
        <ActionButton icon={plusUrl} altText="plus" extraClass="add-button" />
      </TooltipWrapper>
      <TextInputArea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSend={onSend} // ✅ Now correctly named
        selectedModel={selectedModel}
        ref={textAreaRef}
      />
      <TooltipWrapper info="Send" className="send-button-tooltip" position="N">
        <ActionButton
          icon={isStreaming ? stopUrl : sendUrl} 
          altText={isStreaming ? "stop" : "send"}
          extraClass={`send-button ${inputValue || isStreaming ? "send-active" : ""} ${isStreaming ? "stop-active" : ""}`}
          onClick={isStreaming ? onStop : onSend}
        />
      </TooltipWrapper>
    </div>
  );
};

export default InputContainer;
