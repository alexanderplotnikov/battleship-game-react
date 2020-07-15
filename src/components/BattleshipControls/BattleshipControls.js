import React from 'react';
import Ship from './Ship/Ship';

const BattleshipControls = (props) => {
  const ships = [
    { name: 'carrier', size: 5 },
    { name: 'battleship', size: 4 },
    { name: 'cruiser', size: 3 },
    { name: 'submarine', size: 3 },
    { name: 'destroyer', size: 2 },
  ];

  return ships.map((ship) => {
    return <Ship key={ship.name} ship={ship} />;
  });
};

export default BattleshipControls;
