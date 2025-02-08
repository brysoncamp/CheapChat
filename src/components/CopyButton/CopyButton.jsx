import copyUrl from "./copy.svg";
import tickUrl from "./tick.svg";
import useCopyToClipboard from "./useCopyToClipboard";

const CopyButton = ({ text }) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard();

    return (
        <div className="message-button unselectable" onClick={() => copyToClipboard(text)}>
            <img
                src={isCopied ? tickUrl : copyUrl}
                style={{ height: "1rem", cursor: "pointer" }}
                alt="Copy"
                draggable="false"
            />
        </div>
    );
};

export default CopyButton;
