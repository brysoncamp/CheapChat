import "./ConversationName.css";
import { useState, useEffect, useRef } from "react";

const ConversationName = ({ conversationName, setConversationName }) => {
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  const [conversationNameTemp, setConversationNameTemp] = useState(conversationName);

  useEffect(() => {
    setConversationNameTemp(conversationName);
  }, [conversationName]);

  const handleNameChange = (event) => {
    setConversationNameTemp(event.target.value);
  };

  const handleBlur = () => {
    const conversationNameTrimmed = conversationNameTemp.trim();
    if (conversationNameTrimmed !== "") {
      console.log("blur", conversationNameTrimmed);
      setConversationName(conversationNameTrimmed);
      setConversationNameTemp(conversationNameTrimmed);
    } else {
      setConversationNameTemp(conversationName);
    }
  };

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      spanRef.current.textContent = conversationNameTemp || " ";
      const computedStyle = window.getComputedStyle(inputRef.current);
      
      const width =
        spanRef.current.offsetWidth +
        parseFloat(computedStyle.paddingLeft) +
        parseFloat(computedStyle.paddingRight) +
        parseFloat(computedStyle.borderLeftWidth) +
        parseFloat(computedStyle.borderRightWidth) + 16;
      
      inputRef.current.style.width = `${width}px`;
    }
  }, [conversationNameTemp]);

  // Function to move cursor to the end on focus
  const handleFocus = () => {
    console.log("handle focus");
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      setTimeout(() => {
        inputRef.current.setSelectionRange(length, length); // Move cursor to end
        inputRef.current.scrollLeft = inputRef.current.scrollWidth; // Scroll to the rightmost position
      }, 0); // Ensures execution after focus event
    }
  };



  return (
    <div className="conversation-name-container">
      {conversationName !== null && (
        <>
          <input 
            ref={inputRef} 
            className="conversation-name" 
            value={conversationNameTemp} 
            onChange={handleNameChange}
            onBlur={handleBlur}
            onFocus={handleFocus} // Set cursor to end on focus
            style={{ minWidth: '2rem' }}
            maxLength={70}
          />
          <span 
            ref={spanRef}
            style={{
              visibility: 'hidden',
              whiteSpace: 'pre',
              position: 'absolute',
            }}
          >
            {conversationNameTemp}
          </span>
        </>
      )}
    </div>
  );
};

export default ConversationName;
