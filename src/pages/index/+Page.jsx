import { useRef, useEffect, useState } from "react";
import "./Page.css";
import plusUrl from "./plus.svg";
import sendUrl from "./send.svg";

const Page = () => {
  const textAreaRef = useRef(null);
  const inputRef = useRef(null);
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    const textArea = textAreaRef.current;
    const inputContainer = inputRef.current;

    const adjustHeight = () => {
      if (!textArea) return;

      textArea.style.height = "auto"; // Reset height to recalculate
      textArea.style.height = `${textArea.scrollHeight}px`; // Expand dynamically
      inputContainer.style.height = `${textArea.scrollHeight + 30}px`; // Adjust parent container

      // Track if there's text inside (ignoring spaces)
      setHasText(textArea.value.trim() !== "");
    };

    textArea.addEventListener("input", adjustHeight);
    adjustHeight(); // Initialize height on mount

    return () => textArea.removeEventListener("input", adjustHeight);
  }, []);

  return (
    <div className="page">
      <div className="body"></div>
      <div className="input" ref={inputRef}>
        <button className="add-button">
          <img className="plus-icon" src={plusUrl} alt="plus" />
        </button>
        <textarea
          ref={textAreaRef}
          rows="1"
          className="input-text"
          placeholder="Chat with GPT-4o"
        />
        <button className={`send-button ${hasText ? "send-active" : ""}`}>
          <img className="send-icon" src={sendUrl} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default Page;
