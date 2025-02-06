import "./Notice.css";

const Notice = ({ inputValue }) => {
    return (
        <div className={inputValue.trim() ? "notice" : "notice disclaimer"}>
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