export { Layout };

import React, { useState, useMemo } from "react";

import { AuthProvider } from "../AuthProvider/AuthProvider";
import Flex from "../Flex/Flex";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import { StorageProvider } from "../StorageContext/StorageContext";
import { ConversationsProvider } from "../ConversationsProvider/ConversationsProvider";

import "../../styles/global.css";

const Layout = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [lastNonSearchSelectedModel, setLastNonSearchSelectedModel] = useState("gpt-4o-mini");
  const [contentKey, setContentKey] = useState(0);
  const [rootPage, setRootPage] = useState(null);

  const resetContent = () => {
    //setRootPage(true);
    setContentKey(prevKey => prevKey + 1);
  };

  // 🛠️ Prevents Unnecessary Re-Renders by Memoizing Context Providers
  const contextValue = useMemo(
    () => ({ selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, rootPage }),
    [selectedModel, lastNonSearchSelectedModel, rootPage]
  );

  return (
    <React.StrictMode>
      <AuthProvider>
        <ConversationsProvider>
          <Flex>
            <Sidebar
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              resetContent={resetContent}
              setRootPage={setRootPage}
            />
            <Content key={contentKey}>
              {React.cloneElement(children, contextValue)}
            </Content>
          </Flex>
        </ConversationsProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};
