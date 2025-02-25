import "./ReasoningContent.css";
import dropdownUrl from "./dropdown.svg";
import { useState, useRef, useEffect } from "react";
import { disableAutoScroll, enableAutoScroll } from "../../hooks/useScrollManager";

if (!globalThis.reasoningState) {
  globalThis.reasoningState = new Map();
}

const ReasoningContent = ({ children, id }) => {
  const [open, setOpen] = useState(reasoningState.get(id) ?? true);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(null);

  useEffect(() => {
    globalThis.reasoningState.set(id, open);
  }, [open, id]);

  useEffect(() => {
    disableAutoScroll();
    if (contentRef.current) {
      setMaxHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
    const timer = setTimeout(() => {
      enableAutoScroll();
    }, 300)

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <div className="reasoning-container">
      <div className={`reasoning-button unselectable ${open ? "reasoning-button-open" : ""}`} onClick={() => setOpen(!open)}>
        <p>Reasoning</p>
        <img src={dropdownUrl} alt="dropdown" />
      </div>
      <div 
        className="reasoning-content-container" 
        style={{ maxHeight }}
        ref={contentRef}
      >
        <div className="reasoning-line"></div>
        <div className="reasoning-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReasoningContent;
