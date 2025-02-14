export { Layout };

import React from "react";

import { AuthProvider } from "../AuthProvider/AuthProvider";
import Flex from "../Flex/Flex";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import { StorageProvider } from "../StorageContext/StorageContext";
import { useState } from "react";

import "../../styles/global.css";

const Layout = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [lastNonSearchSelectedModel, setLastNonSearchSelectedModel] = useState("gpt-4o-mini");
  const [contentKey, setContentKey] = useState(0);
  const [rootPage, setRootPage] = useState(null);

  const initialValues = {
    sidebarClosed: false,
  }

  const resetContent = () => {
    setRootPage(true);
    setContentKey(prevKey => prevKey + 1); // Change key to force re-mount
  };

  return (
    <React.StrictMode>
      <AuthProvider>

          <Flex>
            <Sidebar selectedModel={selectedModel} setSelectedModel={setSelectedModel} resetContent={resetContent} setRootPage={setRootPage}/>
            <Content key={contentKey}>
              {React.cloneElement(children, { selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel, rootPage })}
            </Content>
          </Flex>
 
      </AuthProvider>
    </React.StrictMode>
  );
}