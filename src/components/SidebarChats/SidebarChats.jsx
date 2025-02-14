import "./SidebarChats.css";

import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import searchUrl from "./search.svg";
import { navigate } from "vike/client/router";


const SidebarChats = ({ isClosed, resetContent, setRootPage }) => {

  const navigateToSearch = () => {
    if (window.location.pathname !== "/search") {
      window.history.pushState({}, "", "/search");
    }
    setRootPage(false);
    navigate("/search"); // Vike's client-side navigation
    setTimeout(() => resetContent(), 100);
  };

  return (
    <div className="sidebar-chats">
      <TooltipWrapper className="align-start" info="Search" position="E" offset={12} enabled={isClosed}>
        <div className="search-button unselectable" onClick={navigateToSearch}>
          <img src={searchUrl} draggable="false"/>
          {!isClosed && <p>Search</p>}
        </div>
      </TooltipWrapper>
    </div>
  )
};

export default SidebarChats;