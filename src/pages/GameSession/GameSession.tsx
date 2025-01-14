import React, { useState } from "react";

import "./GameSession.css";

const GameSession: React.FC = () => {
    const [clicked, setClicked] = useState(false);
    const [keyPress, setKeyPress] = useState(false);
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setKeyPress(true);
        setCount((count) => count + 1)
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 100);
    };
  
    return (
        <label className="cookieClicker">
            <img
                src="https://madoaparis.com/wp-content/uploads/2021/12/Madoaparis_cookie-pepite-chocolat.png"
                className={`cookieClicker-img ${clicked ? 'cookieClicker-img--clicked' : ''}`}
                alt="Image"
                width={200}
                onClick={handleClick}
                tabIndex={0}
                onKeyDown={(event) => event.key === 'Enter' && !keyPress && handleClick()}
                onKeyUp={(event) => event.key === 'Enter' && setKeyPress(false)}
            />
            <span>count is {count}</span>
        </label>
    );
};

export default GameSession;