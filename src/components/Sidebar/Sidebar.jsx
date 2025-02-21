import React, { useState, useEffect } from "react";

import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import SidebarModels from "../SidebarModels/SidebarModels";
import LogoContainer from "../LogoContainer/LogoContainer";
import SidebarChats from "../SidebarChats/SidebarChats";
import billingUrl from "./billing.svg";
import settingsUrl from "./settings.svg";
import { navigate } from "vike/client/router";

import "./Sidebar.css";

const Sidebar = ({ selectedModel, setSelectedModel, resetContent, setRootPage }) => {
  const [isClosed, setIsClosed] = useState(false);

  const navigateToPage = (page) => {
    if (window.location.pathname !== `/${page}`) {
      window.history.pushState({}, "", `/${page}`);
    }
    setRootPage(false);
    navigate(`/${page}`);
    setTimeout(() => resetContent(), 0);
  };

  return (
    <>
      <div className={`sidebar ${isClosed ? 'sidebar-closed' : ''}`}>
        <LogoContainer isClosed={isClosed} resetContent={resetContent} setRootPage={setRootPage} />
      
        <div className={`sidebar-scroll-container ${isClosed ? 'sidebar-scroll-container-closed' : ''}`}>
          <SidebarModels isClosed={isClosed} selectedModel={selectedModel} setSelectedModel={setSelectedModel} resetContent={resetContent} setRootPage={setRootPage}/>
          <SidebarChats isClosed={isClosed} resetContent={resetContent} setRootPage={setRootPage} />
        </div>
        <div className="sidebar-bottom-buttons-container">
          <TooltipWrapper info="Billing" position="E" offset={10} enabled={isClosed}>
            <div className="sidebar-button billing-button" onClick={() => navigateToPage("billing")}>
              <img src={billingUrl} draggable="false"/>
              {!isClosed && <p>Billing</p>}
            </div>
          </TooltipWrapper>
          <TooltipWrapper info="Settings" position="E" offset={10} enabled={isClosed}>
            <div className="sidebar-button settings-button" onClick={() => navigateToPage("settings")}>
              <img src={settingsUrl} draggable="false"/>
              {!isClosed && <p>Settings</p>}
            </div>
          </TooltipWrapper>
        </div>
      </div>
      <div className="divider">
        <div className="divider-line"></div>
        <TooltipWrapper info={isClosed ? "Open" : "Close"} className="sidebar-button-tooltip" position="E" offset={isClosed ? 16 : 4} >
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