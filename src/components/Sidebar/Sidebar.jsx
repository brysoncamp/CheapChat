import React, { useState } from "react";

import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import SidebarModels from "../SidebarModels/SidebarModels";
import LogoContainer from "../LogoContainer/LogoContainer";

import useLocalStorage from "../../hooks/useLocalStorage";
import { useStorage } from '../StorageContext/StorageContext';

import "./Sidebar.css";

const Sidebar = ({ selectedModel, setSelectedModel, resetContent }) => {

  //const [isClosed, setIsClosed] = useState(false);
  //const [isClosed, setIsClosed] = useLocalStorage("sidebarClosed", true);
  //import { useStorage } from './StorageProvider';
  const [isClosed, setIsClosed] = useState(false);

  return (
    <>
      <div className={`sidebar ${isClosed ? 'sidebar-closed' : ''}`}>
        <LogoContainer isClosed={isClosed} resetContent={resetContent} />
        <SidebarModels isClosed={isClosed} selectedModel={selectedModel} setSelectedModel={setSelectedModel} resetContent={resetContent} />
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