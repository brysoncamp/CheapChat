import "./SidebarChats.css";


import { useState, useEffect } from "react";

import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import searchUrl from "./search.svg";
import { navigate } from "vike/client/router";
import { useAuth } from '../AuthProvider/AuthProvider';

const SidebarChats = ({ isClosed, resetContent, setRootPage }) => {

  const { ensureValidToken } = useAuth();

  const navigateToSearch = () => {
    if (window.location.pathname !== "/search") {
      window.history.pushState({}, "", "/search");
    }
    setRootPage(false);
    navigate("/search"); // Vike's client-side navigation
    setTimeout(() => resetContent(), 100);
  };

  useEffect(() => {
    setTimeout(async () => {  // Delay execution slightly
      try {
        const token = await ensureValidToken();
        console.log(ensureValidToken);
        console.log("Token received in SidebarChats:", token);
        
        if (!token) {
          throw new Error("Unauthorized: Failed to get authentication token.");
        }
  
        const response = await fetch("https://api.cheap.chat/conversations/recent", {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Origin": window.location.origin
          }
        });
  
        if (!response.ok) {
          console.error('Network response was not ok');
        }
  
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching recent conversations:", error);
      }
    }, 10000);  // Small delay to wait for auth to be ready
  }, []);
  

  return (
    <div className="sidebar-chats">
      <TooltipWrapper className="align-start" info="Search chats" position="E" offset={12} enabled={isClosed}>
        <div className="search-button unselectable" onClick={navigateToSearch}>
          <img src={searchUrl} draggable="false"/>
          {!isClosed && <p>Search</p>}
        </div>
      </TooltipWrapper>
    </div>
  )
};

export default SidebarChats;