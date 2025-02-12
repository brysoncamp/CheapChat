import { useEffect, forwardRef } from "react";
import "./TextInputArea.css";
import modelsData from "../../data/models.json";

const TextInputArea = forwardRef(({ value, onChange, onSend, selectedModel }, ref) => { // ✅ Consistent name
  useEffect(() => {
    const textArea = ref.current;

    if (!textArea) return;

    // Adjust height dynamically
    textArea.style.height = "auto"; 
    textArea.style.height = `${textArea.scrollHeight}px`;

    // If the value is empty, reset the height to a single line
    if (value === "") {
      textArea.style.height = "auto";
    }
  }, [value]);

  // ✅ Define handleKeyDown inside the component
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents new lines
      onSend(); // ✅ Calls send action
    }
  };

  const selectedModelName = modelsData[selectedModel].displayName;
  const selectedModelCategory = modelsData[selectedModel].category[0];
  //const selectedModelName = "";
  //console.log(selectedModelName);
  //console.log

  return (
    <textarea
      ref={ref}
      rows="1"
      className="input-text"
      placeholder={`${selectedModelCategory} with ${selectedModelName}`}
      value={value}
      onChange={onChange} // Updates the input state
      onKeyDown={handleKeyDown} // ✅ Calls send only when Enter is pressed
    />
  );
});

export default TextInputArea;
