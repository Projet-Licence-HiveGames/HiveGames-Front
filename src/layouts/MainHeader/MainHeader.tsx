import { FC } from "react";
import { Search } from "@mui/icons-material";

import "./MainHeader.css";

const MainHeader: FC = () => {
    return (
    <div className="main-header">
        <div className="search-bar">
            <Search className="search-icon"/>
            <input type="text" className="search-bar-input" placeholder="Search..." />
        </div>
    </div>
    );
};

export default MainHeader;