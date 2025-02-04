import React, { useState } from "react";

import logoUrl from "/logo.svg";
import "./Sidebar.css";

const Sidebar = ({ children }) => {

  const [isClosed, setIsClosed] = useState(false);

  return (
    <>
      <div className={`sidebar ${isClosed ? 'sidebar-closed' : ''}`}>
        <a className="logo-container" href="/">
          <img className="logo" src={logoUrl} alt="logo" />
          <p className="logo-name">CheapChat</p>
        </a>
      </div>
      <div className="divider">
        <div className="divider-line"></div>
        <div className="divider-button" onClick={() => setIsClosed(!isClosed)}>
          <div class="arrow-container">
            <div class="line line-top"></div>
            <div class="line line-bottom"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;