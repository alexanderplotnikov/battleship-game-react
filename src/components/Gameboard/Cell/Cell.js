import React, { Component } from 'react';
import classes from './Cell.module.css';

class Cell extends Component {
  state = {
    active: true,
  };
  handleClick(e) {
    if (this.state.active && !this.props.disabled) {
      this.props.clicked([this.props.row, this.props.col]);
      this.setState({ active: false });
    }
  }
  render() {
    const cell = this.props.content;
    let isShip = false;
    let isHit = false;
    if (cell !== null && cell !== 'miss') {
      isShip = cell.hasOwnProperty('ship');
      isHit = cell.ship.isHit(cell.index);
    }
    const styleClass =
      cell === 'miss'
        ? classes.Miss
        : isHit
        ? classes.Hit
        : this.props.playerBoard && isShip
        ? classes.Player
        : null;

    return (
      <div className={styleClass} onClick={(e) => this.handleClick(e)}></div>
    );
  }
}

export default Cell;
