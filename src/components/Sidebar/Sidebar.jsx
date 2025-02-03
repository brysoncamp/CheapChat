import React, { useState } from "react";

import "./Sidebar.css";

const Sidebar = ({ children }) => {

  const [isClosed, setIsClosed] = useState(false);

  return (
    <>
      <div className={`sidebar ${isClosed ? 'sidebar-closed' : ''}`}>
        { children }
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