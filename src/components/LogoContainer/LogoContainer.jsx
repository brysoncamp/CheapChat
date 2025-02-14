import "./LogoContainer.css";
import logoUrl from "/logo.svg";

const LogoContainer = ({ isClosed, resetContent }) => {

  const navigateToRoot = (event) => {
    event.preventDefault();
    resetContent();
  };

  return (
    <a className="logo-container unselectable" href="/" onClick={navigateToRoot} draggable="false">
      <img className="logo" src={logoUrl} alt="logo" draggable="false" />
      <p className="logo-name"> {!isClosed ? "CheapChat" : "\u00A0" }</p>
    </a>
  )
}

export default LogoContainer;