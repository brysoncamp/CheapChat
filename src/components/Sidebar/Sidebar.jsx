import React, { useState, useEffect } from "react";

import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import SidebarModels from "../SidebarModels/SidebarModels";
import LogoContainer from "../LogoContainer/LogoContainer";
import SidebarChats from "../SidebarChats/SidebarChats";

import "./Sidebar.css";
import plusUrl from "./plus.svg";

const Sidebar = ({ selectedModel, setSelectedModel, resetContent, setRootPage }) => {
  const [isClosed, setIsClosed] = useState(false);

  const navigateToRoot = () => {
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
    }
    navigate("/");
    resetContent();
  };
  //const [isRootOrChatPage, setIsRootOrChatPage] = useState(false);
  /*
  useEffect(() => {
    const checkPath = () => {
      const pathname = window.location.pathname;
      setIsRootOrChatPage(pathname === "/" || pathname.startsWith("/c/"));
    };

    checkPath(); // Run initially
    window.addEventListener("popstate", checkPath); // Listen for browser navigation (back/forward)

    return () => {
      window.removeEventListener("popstate", checkPath); // Cleanup
    };
  }, []);

  useEffect(() => {
    console.log("isRootOrChatPage", isRootOrChatPage);
  }, [isRootOrChatPage]);*/

  return (
    <>
      <div className={`sidebar ${isClosed ? 'sidebar-closed' : ''}`}>
        <LogoContainer isClosed={isClosed} resetContent={resetContent} />
      
        <div className={`sidebar-scroll-container ${isClosed ? 'sidebar-scroll-container-closed' : ''}`}>
          <SidebarModels isClosed={isClosed} selectedModel={selectedModel} setSelectedModel={setSelectedModel} resetContent={resetContent} setRootPage={setRootPage}/>
          <SidebarChats isClosed={isClosed} resetContent={resetContent} setRootPage={setRootPage}/>
        </div>
      </div>
      <div className="divider">
        <div className="divider-line"></div>
        <TooltipWrapper info={isClosed ? "Open" : "Close"} className="sidebar-button-tooltip" position="E" offset={isClosed ? 16 : 4}>
          <div className="divider-button" onClick={() => setIsClosed(!isClosed)}>
            <div className="arrow-container">
              <div className="line line-top"></div>
              <div className="line line-bottom"></div>
            </div>
          </div>
        </TooltipWrapper>
      </div>
    </>
  );
};

export default Sidebar;