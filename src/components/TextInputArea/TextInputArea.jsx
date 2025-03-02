import { useEffect, forwardRef } from "react";
import "./TextInputArea.css";
import modelsData from "../../data/models.json";
import { isMobile } from "react-device-detect";

const TextInputArea = forwardRef(({ value, onChange, onSend, selectedModel }, ref) => {
  useEffect(() => {
    if (isMobile) return; // Do nothing if on mobile

    const textArea = ref.current;
    if (textArea) {
      textArea.focus();  // Focus the textarea when the component mounts
    }
  }, [selectedModel]);

  useEffect(() => {
    const textArea = ref.current;
    if (!textArea) return;

    // Adjust height dynamically
    textArea.style.height = "auto"; 
    textArea.style.height = `${textArea.scrollHeight}px`;

    if (value === "") {
      textArea.style.height = "auto";
    }
  }, [value]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); 
      onSend();
    }
  };

  const selectedModelName = modelsData[selectedModel].displayName;
  const selectedModelCategory = modelsData[selectedModel].category[0];

  const handleFocus = () => {
    if (!isMobile) return;

    const maxScroll = document.documentElement.scrollWidth - window.innerWidth;
    window.scrollTo({ left: maxScroll, behavior: "instant" });
    document.body.style.position = "fixed";
    document.body.style.right = "0";

    const textArea = ref.current;
    textArea.scrollIntoView({ behavior: "smooth", block: "center" });
  };

const handleBlur = () => {
    // Re-enable scrolling when user exits textarea
    document.body.style.position = '';
    document.body.style.right = '';
    const maxScroll = document.documentElement.scrollWidth - window.innerWidth;
    window.scrollTo({ left: maxScroll, behavior: "instant" });

};


  return (
    <textarea
      ref={ref}
      rows="1"
      className="input-text"
      placeholder={`${selectedModelCategory} with ${selectedModelName}`}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
});

export default TextInputArea;
