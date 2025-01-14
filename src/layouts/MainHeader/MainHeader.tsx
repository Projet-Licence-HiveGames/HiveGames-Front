import { Search } from '@mui/icons-material';
import { FC } from 'react';
import { GroupMenu } from '../../components/GroupMenu/GroupMenu.tsx';
import './MainHeader.css';

const MainHeader: FC = () => {
  return (
    <div className='main-header'>
      <div className='search-bar'>
        <Search className='search-icon' />
        <input
          type='text'
          className='search-bar-input'
          placeholder='Search...'
        />
      </div>
      <div className='groupMenu-Styled'>
        <GroupMenu />
      </div>
    </div>
  );
};

export default MainHeader;
