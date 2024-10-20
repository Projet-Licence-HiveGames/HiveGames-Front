import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import {Outlet} from "react-router-dom";

const MainLayout:React.FC = () => {
  return (
    <div>
      <Sidebar />
        <Outlet/>
    </div>
  );
};

export default MainLayout;
