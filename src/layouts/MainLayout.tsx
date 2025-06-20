import { FC } from "react";
import { Outlet } from "react-router-dom";

import MainHeader from "./MainHeader/MainHeader.tsx";
import Sidebar from "./Sidebar/Sidebar.tsx";

import "./MainLayout.css";

export const MainLayout: FC = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="right-panel">
        <MainHeader />
        <div className={"main-content"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
