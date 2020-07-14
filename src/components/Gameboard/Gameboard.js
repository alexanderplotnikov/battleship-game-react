import React from 'react';
import classes from './Gameboard.module.css';
import Cell from './Cell/Cell';

const gameboard = (props) => {
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
          playerBoard={props.playerBoard}
          disabled={props.disabled}
        ></Cell>
      );
    });
  });
  return <div className={classes.Gameboard}>{cells}</div>;
};

export default gameboard;
