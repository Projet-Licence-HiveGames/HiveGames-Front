import React from 'react';
import Sidebar from './Sidebar/Sidebar.tsx';
import { Outlet } from 'react-router-dom';

import './MainLayout.css';
import MainHeader from './MainHeader/MainHeader.tsx';

const MainLayout: React.FC = () => {
  return (
    <div className='app-layout'>
      <Sidebar />
      <div className='right-panel'>
        <MainHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
