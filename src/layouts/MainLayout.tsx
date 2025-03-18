import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader/MainHeader.tsx';
import Sidebar from './Sidebar/Sidebar.tsx';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  return (
    <div className='app-layout'>
      <Sidebar />
      <div className='right-panel'>
        <MainHeader />
        <div className='main-content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
