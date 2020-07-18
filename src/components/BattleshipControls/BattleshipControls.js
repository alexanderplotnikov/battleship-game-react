import React, { useState } from 'react';
import Ship from './Ship/Ship';
import classes from './BattleshipControls.module.css';
const BattleshipControls = (props) => {
  const [orientation, setOrientation] = useState('horizontal');

  const ships = props.ships.map((ship) => {
    return (
      <Ship
        key={ship.name}
        ship={ship}
        selected={props.selected}
        orientation={orientation}
      />
    );
  });
  const handleClick = () => {
    setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal');
  };
  const orientationBtn =
    orientation === 'horizontal' ? 'vertical' : 'horizontal';
  return (
    <div className={props.show ? classes.BattleshipControls : classes.Hide}>
      <div>
        <button onClick={handleClick}>Switch to {orientationBtn}</button>

        {ships}
      </div>
    </div>
  );
};

export default BattleshipControls;
