const ActionButton = ({ icon, altText, onClick, extraClass = "" }) => {
  return (
    <button className={`action-button ${extraClass} unselectable`} onClick={onClick}>
      <img className="icon" src={icon} alt={altText} draggable="false" />
    </button>
  );
};

export default ActionButton;