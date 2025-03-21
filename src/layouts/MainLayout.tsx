import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar.tsx';
import MainHeader from './MainHeader/MainHeader.tsx';
import './MainLayout.css';
import classNames from "classnames";

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='app-layout'>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen}/>
            <div className='right-panel'>
                <MainHeader onSidebarToggle={toggleSidebar} />
                <div className={classNames('main-content', {
                    'main-content--collapsed': isSidebarOpen,
                })}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
