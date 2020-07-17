import React, { useState } from 'react';
import classes from './Cell.module.css';

import { ItemTypes } from '../../../utils/items/constants';
import { useDrop } from 'react-dnd';
const Cell = (props) => {
  const [active, setActive] = useState(true);
  const handleClick = () => {
    if (active && !props.disabled) {
      props.clicked([props.row, props.col]);
      setActive(false);
    }
  };

  const resetState = () => {
    setActive(true);
  };
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.SHIP,
    drop: (item) => {
      let success;
      if (props.placeShip) {
        success = props.placeShip(
          [props.row, props.col],
          item.name,
          item.orientation
        );
      }

      if (success) {
        props.removeSelection(item.name);
      }
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
    }),
  });
  const cell = props.content;
  let isShip = false;
  let isHit = false;
  if (cell !== null && cell !== 'miss' && cell !== undefined) {
    isShip = cell.hasOwnProperty('ship');
    isHit = cell.ship.isHit(cell.index);
  }
  const styleClass =
    cell === 'miss'
      ? classes.Miss
      : isHit
      ? classes.Hit
      : props.playerBoard && isShip
      ? classes.Player
      : null;
  const styleActive = active && !props.disabled ? classes.Active : null;
  return (
    <div
      className={[styleClass, classes.Cell, styleActive].join(' ')}
      onClick={() => handleClick()}
      ref={drop}
    >
      {isOver ? 'x' : null}
    </div>
  );
};

export default Cell;
