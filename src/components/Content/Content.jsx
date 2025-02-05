import "./Content.css";

const Content = ({ children }) => {
  return (
    <div className="page-container">
      { children }
    </div>
  );
}

export default Content;