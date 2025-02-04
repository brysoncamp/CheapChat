import "./Content.css";

const Content = ({ children }) => {
  return (
    <div className="page-container">
      <div className="page-content">
        { children }
      </div>
    </div>
  );
}

export default Content;