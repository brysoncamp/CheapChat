import { useEffect, forwardRef } from "react";
import "./TextInputArea.css";

const TextInputArea = forwardRef(({ value, onChange, onSend }, ref) => { // ✅ Consistent name
  useEffect(() => {
    const textArea = ref.current;

    const adjustHeight = () => {
      if (!textArea) return;
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    };

    textArea.addEventListener("input", adjustHeight);
    adjustHeight();

    return () => {
      textArea.removeEventListener("input", adjustHeight);
    };
  }, [ref]);

  // ✅ Define handleKeyDown inside the component
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents new lines
      onSend(); // ✅ Calls send action
    }
  };

  return (
    <textarea
      ref={ref}
      rows="1"
      className="input-text"
      placeholder="Chat with GPT-4o"
      value={value}
      onChange={onChange} // Updates the input state
      onKeyDown={handleKeyDown} // ✅ Calls send only when Enter is pressed
    />
  );
});

export default TextInputArea;
