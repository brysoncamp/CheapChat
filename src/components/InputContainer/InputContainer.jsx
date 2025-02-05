import { useRef, useEffect } from "react";
import plusUrl from "./plus.svg";
import sendUrl from "./send.svg";
import TextInputArea from "../TextInputArea/TextInputArea";
import ActionButton from "../ActionButton/ActionButton";
import "./InputContainer.css";

const InputContainer = ({ inputValue, setInputValue, onSend }) => { // ✅ Consistent name
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

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
      <ActionButton icon={plusUrl} altText="plus" extraClass="add-button" />
      <TextInputArea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSend={onSend} // ✅ Now correctly named
        ref={textAreaRef}
      />
      <ActionButton
        icon={sendUrl}
        altText="send"
        extraClass={`send-button ${inputValue ? "send-active" : ""}`}
        onClick={onSend} // ✅ Send message on button click
      />
    </div>
  );
};

export default InputContainer;
