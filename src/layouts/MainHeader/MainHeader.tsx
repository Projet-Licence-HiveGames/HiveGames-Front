import React from "react";
import { MenuRounded, Search } from "@mui/icons-material";

import { GroupMenu } from "../../components/GroupMenu/GroupMenu.tsx";

import "./MainHeader.css";

interface MainHeaderProps {
  onSidebarToggle: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ onSidebarToggle }) => {
  return (
    <div className="main-header">
      <button className="sidebar-toggle" onClick={onSidebarToggle}>
        <MenuRounded />
      </button>
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-bar-input"
          placeholder="Search..."
        />
      </div>
      <div className="groupMenu-Styled">
        <GroupMenu />
      </div>
    </div>
  );
};

export default MainHeader;
