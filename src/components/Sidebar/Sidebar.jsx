import React, { useState } from "react";

import logoUrl from "/logo.svg";
import "./Sidebar.css";

const Sidebar = ({ children }) => {

  const [isClosed, setIsClosed] = useState(false);

  return (
    <>
      <div className={`sidebar ${isClosed ? 'sidebar-closed' : ''}`}>
        <a className="logo-container unselectable" href="/" draggable="false">
          <img className="logo" src={logoUrl} alt="logo" draggable="false" />
          <p className="logo-name">CheapChat</p>
        </a>
      </div>
      <div className="divider">
        <div className="divider-line"></div>
        <div className="divider-button" onClick={() => setIsClosed(!isClosed)}>
          <div className="arrow-container">
            <div className="line line-top"></div>
            <div className="line line-bottom"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;