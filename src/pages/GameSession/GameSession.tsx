import React, { useState, useEffect, useRef } from 'react';

import './GameSession.css';

export const GameSession: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [keyPress, setKeyPress] = useState(false);
  const [count, setCount] = useState(0);
  const [crankTurns, setCrankTurns] = useState(0);
  const [isCrankActive, setIsCrankActive] = useState(false); // To track if crank is being used
  const [crankAngle, setCrankAngle] = useState(0); // To track the angle of the crank's rotation
  const crankRef = useRef<HTMLDivElement | null>(null);
  const [upgrades, setUpgrades] = useState({
    perClick: 1,
    perSecond: 0,
    spinnerMultiplier: 1,
    rangeMultiplier: 1,
    bonusMultiplier: 1,
    autoClicker1: 0,
    crankPower: 1,
  });
  type UpgradeType = 'perClick' | 'perSecond' | 'spinner' | 'range' | 'bonusMultiplier' | 'autoClicker1' | 'autoClicker2' | 'pump' | 'crankPower';

  const [upgradeLevels, setUpgradeLevels] = useState<Record<UpgradeType, number>>({
    perClick: 0,
    perSecond: 0,
    spinner: 0,
    range: 0,
    bonusMultiplier: 0,
    autoClicker1: 0,
    autoClicker2: 0,
    pump: 0,
    crankPower: 0,
  });
  const [upgradeCosts, setUpgradeCosts] = useState({
    perClick: 10,
    perSecond: 50,
    spinner: 100,
    range: 200,
    bonusMultiplier: 500,
    autoClicker1: 300,
    autoClicker2: 600,
    pump: 1000,
    crankPower: 1000,
  });
  const [rangeValue, setRangeValue] = useState(5);
  const [pumpValue, setPumpValue] = useState(Math.random() * 10);
  const [targetValue, setTargetValue] = useState(Math.random() * 10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (upgrades.perSecond > 0) {
        const additionalPerSecond =
          upgradeLevels.perSecond +
          upgradeLevels.autoClicker1 * 2 +
          upgradeLevels.autoClicker2 * 5;
        setCount((prevCount) => prevCount + additionalPerSecond);
        setTargetValue(Math.random() * 10);
        handleCookiePressed();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [upgradeLevels]);

  const handleClick = () => {
    setKeyPress(true);
    setCount((count) => count + upgrades.perClick * upgrades.spinnerMultiplier * upgrades.rangeMultiplier);
    handleCookiePressed();
  };

  const handleCookiePressed = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 100);
  };

  const handleUpgrade = (type: UpgradeType) => {
    if (count >= upgradeCosts[type]) {
      setCount((prevCount) => prevCount - upgradeCosts[type]);
      setUpgrades((prevUpgrades) => {
        const newUpgrades = { ...prevUpgrades };
        if (type === 'perClick' || type === 'perSecond') {
          newUpgrades[type] += 1;
        } else if (type === 'spinner') {
          newUpgrades.spinnerMultiplier += 0.5;
        } else if (type === 'range') {
          newUpgrades.rangeMultiplier += 0.5;
        } else if (type === 'bonusMultiplier') {
          newUpgrades.perClick *= 2;
        } else if (type === 'autoClicker1') {
          newUpgrades.perSecond += 2;
        } else if (type === 'autoClicker2') {
          newUpgrades.perSecond += 5;
        }
        return newUpgrades;
      });

      setUpgradeLevels((prevLevels) => ({
        ...prevLevels,
        [type]: prevLevels[type] + 1,
      }));

      setUpgradeCosts((prevCosts) => ({
        ...prevCosts,
        [type]: Math.floor(prevCosts[type] * 2),
      }));
    }
  };

  const shouldShowUpgrade = (type: UpgradeType, dependency: UpgradeType) => {
    return upgradeLevels[dependency] >= 5;
  };

  const handleRangeChange = (value: number) => {
    setRangeValue(value);
    const difference = Math.abs(targetValue - value);
    const bonus = Math.max(0, 5 - difference); // Max bonus when close to target
    setUpgrades((prevUpgrades) => ({
      ...prevUpgrades,
      perSecond: prevUpgrades.rangeMultiplier + bonus,
    }));
  };

  const [pumpHasBeenTopOrBottom, setHasBeenPumpTopOrBottom] = useState('top');
  const handlePumpChange = (value: number) => {
    // quand la valeur arrive à 0 on ajoute 1000 points
    if (value === 0 && pumpHasBeenTopOrBottom === 'top') {
      setCount((prevCount) => prevCount + 1000);
      setHasBeenPumpTopOrBottom('bottom');
    } else if (value === 10 && pumpHasBeenTopOrBottom === 'bottom') {
      setCount((prevCount) => prevCount + 1000);
      setHasBeenPumpTopOrBottom('top');
    }
  };

  const handleCrankTurn = () => {
    const crankBonus = upgrades.crankPower;
    setCount((prevCount) => prevCount + crankBonus);
    setCrankTurns((prevTurns) => prevTurns + 1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsCrankActive(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isCrankActive && crankRef.current) {
      const rect = crankRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Get angle in degrees

      // Update crank angle and trigger a crank turn every 10 degrees
      if (Math.abs(angle - crankAngle) >= 10) {
        setCrankAngle(angle);
        handleCrankTurn();
      }
    }
  };

  const handleMouseUp = () => {
    setIsCrankActive(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isCrankActive, crankAngle]);

  return (
    <div className='game-session'>
      <label className='cookieClicker'>
        <img
          src='https://madoaparis.com/wp-content/uploads/2021/12/Madoaparis_cookie-pepite-chocolat.png'
          className={`cookieClicker-img ${clicked ? 'cookieClicker-img--clicked' : ''}`}
          alt='Image'
          width={200}
          onClick={handleClick}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && !keyPress && handleClick()}
          onKeyUp={(e) => e.key === 'Enter' && setKeyPress(false)}
        />
        <span>Count is {count}</span>
        <div>Current Auto: {upgradeLevels.perSecond + upgradeLevels.autoClicker1 * 2 + upgradeLevels.autoClicker2 * 5} per second</div>
      </label>

      <div className='upgrades'>
        <h3>Upgrades</h3>
        <div className='upgrade-item'>
          <button onClick={() => handleUpgrade('perClick')} disabled={count < upgradeCosts.perClick}>
            Upgrade Click (+{upgrades.perClick} per click) - Cost: {upgradeCosts.perClick} (Level: {upgradeLevels.perClick})
          </button>
        </div>
        <div className='upgrade-item'>
          <button onClick={() => handleUpgrade('perSecond')} disabled={count < upgradeCosts.perSecond}>
            Upgrade Auto (+{upgrades.perSecond} per second) - Cost: {upgradeCosts.perSecond} (Level: {upgradeLevels.perSecond})
          </button>
        </div>
        {shouldShowUpgrade('spinner', 'perClick') && (
          <div className='upgrade-item'>
            <button onClick={() => handleUpgrade('spinner')} disabled={count < upgradeCosts.spinner}>
              Spinner Multiplier (+50% per click) - Cost: {upgradeCosts.spinner} (Level: {upgradeLevels.spinner})
            </button>
          </div>
        )}
        {shouldShowUpgrade('range', 'spinner') && (
          <div className='upgrade-item'>
            <button onClick={() => handleUpgrade('range')} disabled={count < upgradeCosts.range}>
              Range Multiplier (+50% per click) - Cost: {upgradeCosts.range} (Level: {upgradeLevels.range})
            </button>
            <div className='range-container'>
              <input
                type='range'
                min='0'
                max='10'
                value={rangeValue}
                className='range-upgrade'
                onChange={(e) => handleRangeChange(parseFloat(e.target.value))}
              />
              <div>Range Value: {rangeValue.toFixed(1)}</div>
              <div>Target Value: {targetValue.toFixed(1)}</div>
            </div>
          </div>
        )}
        {shouldShowUpgrade('bonusMultiplier', 'range') && (
          <div className='upgrade-item'>
            <button onClick={() => handleUpgrade('bonusMultiplier')} disabled={count < upgradeCosts.bonusMultiplier}>
              Bonus Multiplier (Double Click Power) - Cost: {upgradeCosts.bonusMultiplier} (Level: {upgradeLevels.bonusMultiplier})
            </button>
          </div>
        )}
        {shouldShowUpgrade('autoClicker1', 'perSecond') && (
          <div className='upgrade-item'>
            <button onClick={() => handleUpgrade('autoClicker1')} disabled={count < upgradeCosts.autoClicker1}>
              Auto Clicker 1 (+2 per second) - Cost: {upgradeCosts.autoClicker1} (Level: {upgradeLevels.autoClicker1})
            </button>
          </div>
        )}
        {shouldShowUpgrade('autoClicker2', 'autoClicker1') && (
          <div className='upgrade-item'>
            <button onClick={() => handleUpgrade('autoClicker2')} disabled={count < upgradeCosts.autoClicker2}>
              Auto Clicker 2 (+5 per second) - Cost: {upgradeCosts.autoClicker2} (Level: {upgradeLevels.autoClicker2})
            </button>
          </div>
        )}
        {shouldShowUpgrade('pump', 'autoClicker2') && (
          <div className='upgrade-item'>
          <button onClick={() => handleUpgrade('pump')} disabled={count < upgradeCosts.pump}>
            Pump Multiplier (+50% per click) - Cost: {upgradeCosts.pump} (Level: {upgradeLevels.pump})
          </button>
          <div className='pump-container'>
            <input
              type='range'
              min='0'
              max='10'
              value={pumpValue}
              className='pump-upgrade'
              onChange={(e) => {setPumpValue(parseFloat(e.target.value)); handlePumpChange(parseFloat(e.target.value));}}
            />
          </div>
        </div>
        )}
        {shouldShowUpgrade('crankPower', 'pump') && (
          <div className="upgrade-item">
            <button onClick={handleCrankTurn}>
              Crank Power (+{upgrades.crankPower} per turn)
            </button>
            <div
              className="crank-container"
              ref={crankRef}
              onMouseDown={handleMouseDown}
              style={{ cursor: isCrankActive ? 'grabbing' : 'grab' }}
            >
              <button className="crank-button">Turn the Crank!</button>
              <div>Crank Turns: {crankTurns}</div>
              <div>Crank Power: {upgrades.crankPower}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
