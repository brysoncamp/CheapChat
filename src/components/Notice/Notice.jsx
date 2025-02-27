import "./Notice.css";

// import ismobile from import
import { isMobile } from "react-device-detect";

const Notice = ({ inputValue }) => {
    console.log("isMobile", isMobile);


    return (
        !isMobile && <div className={inputValue.trim() ? "notice" : "notice disclaimer"}>
            {inputValue.trim() ? (
                "Use Shift+Enter to start a new line."
            ) : (
                <a href="https://www.cheap.chat/terms" target="_blank">
                Model accuracy varies. Check critical information.
                </a>
            )}
        </div>
    );
};

export default Notice;