const ActionButton = ({ icon, altText, onClick, extraClass = "" }) => {
  return (
    <button className={`action-button ${extraClass}`} onClick={onClick}>
      <img className="icon" src={icon} alt={altText} />
    </button>
  );
};

export default ActionButton;