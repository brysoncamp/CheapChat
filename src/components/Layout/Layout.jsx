export { Layout };

import React from "react";
import logoUrl from "/logo.svg";
import "./css/index.css";
import "../../styles/global.css";

import { AuthProvider } from "../AuthProvider/AuthProvider";

function Layout({ children }) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Frame>
          <Sidebar>
            <Logo />
            <a href="/">Credits</a>
            <a href="/account">Account</a>
          </Sidebar>
          <Content>{children}</Content>
        </Frame>
      </AuthProvider>
    </React.StrictMode>
  );
}

function Frame({ children }) {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 900,
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
}

function Sidebar({ children }) {
  return (
    <div
      id="sidebar"
      style={{
        padding: 20,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        lineHeight: "1.8em",
        borderRight: "2px solid #eee",
      }}
    >
      {children}
    </div>
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