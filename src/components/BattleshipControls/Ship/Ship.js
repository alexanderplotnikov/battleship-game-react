import React from 'react';
import Cell from '../../Gameboard/Cell/Cell';
import classes from './Ship.module.css';
import { ItemTypes } from '../../../utils/items/constants';
import { useDrag } from 'react-dnd';
const Ship = (props) => {
  const [, drag] = useDrag({
    item: {
      type: ItemTypes.SHIP,
      name: props.ship.name,
      size: props.ship.size,
      orientation: props.orientation,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const ship = [];
  for (let i = 0; i < props.ship.size; i++) {
    ship.push(<Cell key={props.ship.name + i} disabled />);
  }
  const styleShip =
    props.orientation === 'horizontal' ? classes.Horizontal : classes.Vertical;
  return (
    <div ref={drag} className={[styleShip, classes.Ship].join(' ')}>
      {ship}
    </div>
  );
};

export default Ship;
