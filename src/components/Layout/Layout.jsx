export { Layout };

import React from "react";
import logoUrl from "/logo.svg";
import "../../styles/global.css";

import { AuthProvider } from "../AuthProvider/AuthProvider";
import Flex from "../Flex/Flex";
import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Flex>
          <Sidebar>
            <Logo />
            <a href="/">Credits</a>
            <a href="/account">Account</a>
          </Sidebar>
          <Content>{children}</Content>
        </Flex>
      </AuthProvider>
    </React.StrictMode>
  );
}

function Content({ children }) {
  return (
    <div id="page-container">
      <div
        id="page-content"
        style={{
          padding: 20,
          paddingBottom: 50,
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <a href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}