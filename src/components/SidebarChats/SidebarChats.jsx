import "./SidebarChats.css";

import { useState, useEffect } from "react";

import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";
import searchUrl from "./search.svg";
import dotsUrl from "./dots.svg";
import { navigate } from "vike/client/router";
import { useConversations } from "../ConversationsProvider/ConversationsProvider";
import { getConversationId } from "../../hooks/useConversation";
import { isMobile } from "react-device-detect";


const SidebarChats = ({ isClosed, resetContent, setRootPage }) => {

  const [conversationId, setConversationId] = useState(getConversationId());

  useEffect(() => {
    const updateConversationId = () => {
      const newConversationId = getConversationId();
      if (newConversationId !== conversationId) {
        setConversationId(newConversationId);
        console.log("URL CHANGED, conversationId updated:", newConversationId);
      }
    };

    const observer = new MutationObserver(updateConversationId);
    observer.observe(document.body, { childList: true, subtree: true });

    const handleHistoryChange = () => {
      updateConversationId();
    };

    window.addEventListener("popstate", handleHistoryChange);
    window.addEventListener("pushstate", handleHistoryChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("popstate", handleHistoryChange);
      window.removeEventListener("pushstate", handleHistoryChange);
    };
  }, [conversationId]);


  const { conversations } = useConversations();

  const navigateToSearch = () => {
    if (window.location.pathname !== "/search") {
      window.history.pushState({}, "", "/search");
    }
    setRootPage(false);
    navigate("/search");
    setTimeout(() => resetContent(), 100);
    //if (isMobile) document.documentElement.scrollLeft = document.documentElement.scrollWidth;
  };

  const navigateToConversation = (conversationId, title) => {
    console.log("Navigate to conversation", conversationId);
    if (isMobile) {
      setTimeout(() => {
        document.documentElement.scrollLeft = document.documentElement.scrollWidth;
      }, 100);
    }
    console.log(isMobile);
    if (window.location.pathname === `/c/${conversationId}`) return;
    window.history.pushState({}, "", `/c/${conversationId}`);
    setRootPage(false);
    document.title = title || "CheapChat";
    console.log("setting root page to false");
    setTimeout(() => resetContent(), 50);
  };
 
  return (
    <div className={`sidebar-chats ${isClosed ? "sidebar-chats-closed" : ""}`}>
      <div className={`search-button-background ${isClosed ? "search-button-background-closed" : ""}`} onClick={navigateToSearch}>
        <TooltipWrapper className="align-start" info="Search chats" position="E" offset={12} enabled={isClosed}>
          <div className="search-button unselectable" onClick={navigateToSearch}>
            <img src={searchUrl} draggable="false"/>
            {!isClosed && <p>Search</p>}
          </div>
        </TooltipWrapper>
      </div>
      {!isClosed && <div className="conversations-container">
        {conversations.length > 0 && (
          conversations.map((chat) => (
            <div key={chat.conversationId} className={`conversation ${conversationId === chat.conversationId ? "conversation-selected" : ""}`} onClick={() => navigateToConversation(chat.conversationId, chat.title)}>
              <div className="conversation-text">{chat.title || "Untitled Chat"}</div>
              <TooltipWrapper className="conversation-settings" info="Options" position="E" offset={8}>
                <div className="conversation-settings-button" onClick={(event) => { event.stopPropagation(); console.log("hello"); }}>
                  <img src={dotsUrl} draggable="false"/>
                </div>
              </TooltipWrapper>
            </div>
          ))
        )}
      </div>}
    </div>
  )
};

export default SidebarChats;