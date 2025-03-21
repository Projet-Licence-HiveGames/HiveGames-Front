import React, {useEffect, useRef} from 'react';
import { CalendarMonth, HomeRounded, StorefrontOutlined, Subscriptions } from '@mui/icons-material';
import MenuItem from '../../components/ui/Menu/MenuItem';
import classNames from 'classnames';
import './Sidebar.css';
import logo from '@assets/images/logo.svg';
import logoName from '@assets/images/logo-name.svg';
import useWindowSize from "../../utils/useWindowSize.ts";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, setIsOpen}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const {isMobile, isTablet} = useWindowSize();

  console.log(isMobile);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isMobile || isTablet) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isTablet]);

  return (
      <div
          ref={sidebarRef}
          className={classNames('sidebar-container', {
            'sidebar-container--collapsed': !isOpen,
          })}>

        <div className='sidebar-header'>
          <img src={!isOpen ? logo : logoName} alt='Logo'/>
        </div>

        <div className='sidebar-content'>
          <MenuItem to='/'>
            <HomeRounded/>
            <span>Home</span>
          </MenuItem>
          <MenuItem to='/catalogue'>
            <StorefrontOutlined/>
            <span>Catalogue</span>
          </MenuItem>
          <hr/>
          <MenuItem to='/calendar'>
            <CalendarMonth/>
            <span>Calendrier</span>
          </MenuItem>
          <MenuItem to='/subscription'>
            <Subscriptions/>
            <span>Abonnement</span>
          </MenuItem>
          <hr/>
        </div>
      </div>
  );
};

export default Sidebar;
