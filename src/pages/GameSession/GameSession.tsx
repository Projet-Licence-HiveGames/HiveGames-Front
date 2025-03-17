import { FC, useState } from 'react';

import './GameSession.css';
import classNames from 'classnames';
import { MaterialSymbol } from 'react-material-symbols';

interface GameSessionProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const GameSession: FC<GameSessionProps> = () => {
  const [isOpen, _setIsOpen] = useState(true);

  const handleOpen = () => {
    _setIsOpen(true);
  }
  return (
    <div className={classNames('game-session-container', { 'game-session-container--open': isOpen })}>
      {isOpen && (
        <div className='game-session-overlay'>
          <iframe src='https://projet-licence-hivegames.github.io/Cookie-Clicker-Source-Code/' title='Cookie Clicker' width={'100%'} height={'100%'} />
          <MaterialSymbol icon='close' onClick={() => _setIsOpen(false)} className='game-session-close'/>
        </div>
      )}
    </div>
  );

};
