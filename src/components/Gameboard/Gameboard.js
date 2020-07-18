import React from 'react';
import classes from './Gameboard.module.css';
import Cell from './Cell/Cell';

const Gameboard = (props) => {
  const cells = props.board.map((row, r) => {
    return row.map((col, c) => {
      return (
        <Cell
          row={r}
          col={c}
          clicked={props.attack}
          key={r.toString() + c}
          content={col}
          isShip={col}
          removeSelection={props.selected}
          placeShip={props.placeShip}
          playerBoard={props.playerBoard}
          disabled={props.disabled}
        />
      );
    });
  });

  return (
    <div className={props.show ? classes.Gameboard : classes.Hide}>{cells}</div>
    //<div className={classes.Gameboard}>{cells}</div>
  );
};

export default Gameboard;
