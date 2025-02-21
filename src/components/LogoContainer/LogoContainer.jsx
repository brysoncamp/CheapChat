import "./LogoContainer.css";
import logoUrl from "/logo.svg";
import { navigate } from "vike/client/router";

const LogoContainer = ({ isClosed, resetContent, setRootPage }) => {

  const navigateToRoot = () => {
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
    }
    navigate("/");
    setRootPage(true);
    setTimeout(() => resetContent(), 0);
    console.log("navigating to root");
  };

  return (
    <a className="logo-container unselectable" href="/" onClick={navigateToRoot} draggable="false">
      <img className="logo" src={logoUrl} alt="logo" draggable="false" />
      <p className="logo-name"> {!isClosed ? "CheapChat" : "\u00A0" }</p>
    </a>
  )
}

export default LogoContainer;