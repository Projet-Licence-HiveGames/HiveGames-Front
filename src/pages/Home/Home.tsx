import React, {useEffect, useState} from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '../../assets/vite.svg';
import { GameSession } from '../GameSession/GameSession.tsx';
import './Home.css';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');

    useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(err => console.log(err));
    },[])

  return (
    <div className='container'>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
        {message}
      <GameSession />
    </div>
  );
};

export default Home;
