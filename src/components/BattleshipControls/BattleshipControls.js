import React, { useState } from 'react';
import Ship from './Ship/Ship';

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

  return (
    <div>
      <label htmlFor="orientation">
        Flip
        <br />
        <input id="orientation" type="checkbox" onClick={handleClick} />
      </label>
      {ships}
    </div>
  );
};

export default BattleshipControls;
