import copyUrl from "./copy.svg";
import tickUrl from "./tick.svg";
import useCopyToClipboard from "./useCopyToClipboard";
import "./CopyCodeButton.css";

const CopyCodeButton = ({ text }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <div className="copy-code-container">
      <div className="copy-code-button unselectable" onClick={() => copyToClipboard(text)}>
      <img
        src={isCopied ? tickUrl : copyUrl}
        className="copy-code-icon sharp-svg"
        alt="Copy"
        draggable="false"
      />
        <div>Copy</div>
      </div>
    </div>
  );
};

export default CopyCodeButton;
