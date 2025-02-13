import "./ChatLoading.css";

const ChatLoading = () => {
  return (
    <div className="loading-container">
      <div className="loading-container-inner">
        <div className="loading-user-message">
          <div className="loading-bar shimmer"></div>
          <div className="loading-bar shimmer"></div>
          <div className="loading-bar shimmer"></div>
        </div>
        <div className="loading-ai-container">
          <div className="loading-ai-icon-container">
            <div className="loading-ai-icon shimmer"></div>
          </div>
          <div className="loading-ai-message">
            <div className="loading-bar shimmer"></div>
            <div className="loading-bar shimmer"></div>
            <div className="loading-bar shimmer"></div>
            <div className="loading-bar shimmer"></div>
            <div className="loading-bar shimmer"></div>
            <div className="loading-bar shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLoading;