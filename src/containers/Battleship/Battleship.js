import React, { Component } from 'react';
import Gameboard from '../../components/Gameboard/Gameboard';
import classes from './Battleship.module.css';
import playerFactory from '../../lib/player/player';
import BattleshipControls from '../../components/BattleshipControls/BattleshipControls';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  handlePlaceShip = (loc, type, orientation) => {
    this.player.placeShip(loc, type, orientation);
  };
  computerAttack = () => {
    const availableHits = this.player.getShots();
    const randomShot = Math.floor(Math.random() * availableHits.length);
    const loc = availableHits[randomShot];
    this.comp.attack(this.player, loc);
  };
  takeTurnHandler = () => {
    this.setState({
      playerTurn: !this.state.playerTurn,
      compTurn: !this.state.compTurn,
    });
  };
  render() {
    this.player.placeShip([0, 0], 'carrier');
    return (
      <div>
        <div>{this.state.playerTurn ? 'Player' : "Computer's"} turn</div>
        <DndProvider backend={HTML5Backend}>
          <div className={classes.BattleshipControls}></div>
          <BattleshipControls />
          <Gameboard
            board={this.state.playerBoard}
            placeShip={this.handlePlaceShip}
            playerBoard
            disabled
          />
          <Gameboard board={this.state.compBoard} attack={this.handleAttack} />
        </DndProvider>
      </div>
    );
  }
}

export default Battleship;
