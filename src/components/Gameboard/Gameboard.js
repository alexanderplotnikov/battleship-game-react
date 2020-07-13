import React from 'react';
import classes from './Gameboard.module.css';

const gameboard = (props) => {
  return (
    <div className={classes.Gameboard}>
      {props.board.map((row, r) => {
        return row.map((_, c) => {
          return <div key={r + c}></div>;
        });
      })}
    </div>
  );
};

export default gameboard;
