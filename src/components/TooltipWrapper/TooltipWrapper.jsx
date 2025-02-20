import { useState, useRef, useEffect } from "react";
import "./TooltipWrapper.css";

const TooltipWrapper = ({ children, info, className, position = "S", offset = 8, enabled = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const calculateTooltipPosition = (rect) => {
      switch (position) {
        case "N": // North
          return {
            top: `${rect.top - offset}px`,
            left: `${rect.left + rect.width / 2}px`,
            transform: "translate(-50%, -100%)"
          };
        case "E": // East
          return {
            top: `${rect.top + rect.height / 2}px`,
            left: `${rect.right + offset}px`,
            transform: "translateY(-50%)"
          };
        case "W": // West
          return {
            top: `${rect.top + rect.height / 2}px`,
            left: `${rect.left - offset}px`,
            transform: "translate(-100%, -50%)"
          };
        case "S": // South (default)
        default:
          return {
            top: `${rect.bottom + offset}px`,
            left: `${rect.left + rect.width / 2}px`,
            transform: "translateX(-50%)"
          };
      }
    };
    
    if (isHovered && wrapperRef.current) {
        timeoutRef.current = setTimeout(() => {
        const rect = wrapperRef.current.getBoundingClientRect();
        const styles = calculateTooltipPosition(rect);
        setTooltipStyle(styles);
        setShowTooltip(true);
        }, 500);
    } else {
        clearTimeout(timeoutRef.current);
        setShowTooltip(false);
    }
  
    return () => clearTimeout(timeoutRef.current); // Cleanup timeout on unmount
  }, [isHovered]);

  return (
    <div
      ref={wrapperRef}
      className={`tooltip-wrapper ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >{/*style={{ display: "inline-block", position: "relative" }}*/}
      {children}
      {(showTooltip && enabled) && (
        <div className="tooltip" style={tooltipStyle}>
          {info}
          <div className={`tooltip-arrow tooltip-arrow--${position.toLowerCase()}`}></div>
        </div>
      )}
    </div>
  );
};

export default TooltipWrapper;
