export { Layout };

import React from "react";

import { AuthProvider } from "../AuthProvider/AuthProvider";
import Flex from "../Flex/Flex";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import { useState } from "react";

import "../../styles/global.css";

const Layout = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  const [lastNonSearchSelectedModel, setLastNonSearchSelectedModel] = useState("gpt-4o-mini");

  return (
    <React.StrictMode>
      <AuthProvider>
        <Flex>
          <Sidebar selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
          <Content>
            {React.cloneElement(children, { selectedModel, setSelectedModel, lastNonSearchSelectedModel, setLastNonSearchSelectedModel })}
          </Content>
        </Flex>
      </AuthProvider>
    </React.StrictMode>
  );
}