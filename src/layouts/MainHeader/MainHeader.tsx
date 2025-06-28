import { FC } from "react";

import { GroupMenu } from "@components/GroupMenu/GroupMenu.tsx";

import "./MainHeader.css";

import { SearchBar } from "@/components/Header/SearchBar/SearchBar.tsx";

const MainHeader: FC = () => {
  return (
    <div className="main-header">
      <SearchBar />
      <div className="groupMenu-Styled">
        <GroupMenu />
      </div>
    </div>
  );
};

export default MainHeader;
