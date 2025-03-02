import React, { useState, useEffect } from "react";

import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import SidebarModels from "../SidebarModels/SidebarModels";
import LogoContainer from "../LogoContainer/LogoContainer";
import SidebarChats from "../SidebarChats/SidebarChats";
import billingUrl from "./billing.svg";
import settingsUrl from "./settings.svg";
import { navigate } from "vike/client/router";

import { isMobile } from "react-device-detect";

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

  useEffect(() => {
    if (!isMobile) return;

    if (isClosed) {
      document.documentElement.scrollLeft = document.documentElement.scrollWidth;
    } else {
      document.documentElement.scrollLeft = 0;
    }
  }, [isClosed]);

  // use effect for when document is scrolled to the right on mobile set isClosed to true
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      const scrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
      const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;

      if (scrollLeft > (scrollWidth - clientWidth) / 8) {
        setIsClosed(true);
        console.log("scroll left is greater than 1/8 of");
      }

      if (scrollLeft === 0) {
        //if (isMobile) return; 
        // isMobile & text input area is open
        //if (isMovile )

        // if is mobile and body is position fixed then return
        if (isMobile && document.body.style.position === "fixed") return;

        setIsClosed(false);
        console.log(isMobile);
        console.log("scroll left is 0");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("IS MOBILE", isMobile);
    if (isMobile) {
      setTimeout(() => {
        setIsClosed(true);
      }, 0);
    }
  }, []);
  

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