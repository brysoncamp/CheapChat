export { Layout };

import React from "react";

import { AuthProvider } from "../AuthProvider/AuthProvider";
import Flex from "../Flex/Flex";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";

import "../../styles/global.css";

const Layout = ({ children }) => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Flex>
          <Sidebar />
          <Content>{ children }</Content>
        </Flex>
      </AuthProvider>
    </React.StrictMode>
  );
}