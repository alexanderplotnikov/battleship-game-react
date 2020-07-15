import React from 'react';
import Cell from '../../Gameboard/Cell/Cell';
import classes from './Ship.module.css';
import { ItemTypes } from '../../../utils/items/constants';
import { useDrag } from 'react-dnd';
const Ship = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SHIP, name: props.ship.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const ship = [];
  for (let i = 0; i < props.ship.size; i++) {
    ship.push(<Cell key={props.ship.name + i} />);
  }
  return (
    <div ref={drag} className={classes.Ship}>
      {ship}
    </div>
  );
};

export default Ship;
