import React, { Component } from 'react';
import Gameboard from '../../components/Gameboard/Gameboard';

import playerFactory from '../../lib/player/player';

class Battleship extends Component {
  player = playerFactory();
  comp = playerFactory();
  state = {
    playerBoard: this.player.getBoard(),
    compBoard: this.comp.getBoard(),
    playerTurn: true,
    compTurn: false,
  };
  handleAttack = (loc) => {
    this.player.attack(this.comp, loc);
    this.computerAttack();
    this.takeTurnHandler();
  };
  computerAttack = () => {
    const availableHits = this.player.getShots();
    const randomShot = Math.floor(Math.random() * availableHits.length);
    const loc = availableHits[randomShot];
    this.comp.attack(this.player, loc);
    this.takeTurnHandler();
  };
  takeTurnHandler = () => {
    this.setState({
      playerTurn: !this.state.playerTurn,
      compTurn: !this.state.compTurn,
    });
  };
  render() {
    this.player.placeShip([0, 0], 'carrier');
    this.comp.placeShip([0, 0], 'carrier');

    return (
      <div>
        <div>{this.state.playerTurn ? 'Player' : "Computer's"} turn</div>
        <Gameboard board={this.state.playerBoard} playerBoard disabled />
        <Gameboard board={this.state.compBoard} attack={this.handleAttack} />
      </div>
    );
  }
}

export default Battleship;
