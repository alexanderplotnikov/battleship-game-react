import React from 'react';
import classes from './Cell.module.css';

import { ItemTypes } from '../../../utils/items/constants';
import { useDrop } from 'react-dnd';
const Cell = (props) => {
  const handleClick = () => {
    if (cell) {
      if (cell.active && !props.disabled) {
        props.clicked([props.row, props.col]);
      }
      cell.active = false;
    }
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
  let isHit, styleClass, styleActive;
  if (cell) {
    isHit = cell.ship ? cell.ship.isHit(cell.index) : false;
    styleClass = cell.miss
      ? classes.Miss
      : isHit
      ? classes.Hit
      : props.playerBoard && cell.ship
      ? classes.Player
      : null;
    styleActive = cell.active && !props.disabled ? classes.Active : null;
  }

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
