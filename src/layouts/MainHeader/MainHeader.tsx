import { FC } from "react";

import { GroupMenu } from "@components/GroupMenu/GroupMenu.tsx";
import { SearchBar } from "@components/Header/SearchBar/SearchBar.tsx";

import "./MainHeader.css";

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
