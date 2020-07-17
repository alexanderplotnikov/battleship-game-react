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
    gameOn: true,
    playerBoard: this.player.getBoard(),
    compBoard: this.comp.getBoard(),
    playerTurn: true,
    compTurn: false,
    ships: [
      { name: 'carrier', size: 5 },
      { name: 'battleship', size: 4 },
      { name: 'cruiser', size: 3 },
      { name: 'submarine', size: 3 },
      { name: 'destroyer', size: 2 },
    ],
    playerSunk: 0,
    compSunk: 0,
    playerWon: '',
  };
  resetState = {};
  componentDidMount() {
    this.resetState = { ...this.state };
    this.placeCompShip();
  }
  placeCompShip = () => {
    const newShips = [...this.state.ships];
    const availableHits = this.player.getShots();

    while (newShips.length) {
      newShips.forEach((ship, i) => {
        let rand = Math.round(Math.random());
        let randOrientation = rand === 1 ? 'horizontal' : 'vertical';
        let randomPlace = Math.floor(Math.random() * availableHits.length);
        let success = this.comp.placeShip(
          availableHits[randomPlace],
          ship.name,
          randOrientation
        );
        if (success) {
          newShips.splice(i, 1);
        }
      });
    }
  };
  handleReset = () => {
    this.player = { ...playerFactory() };
    this.comp = { ...playerFactory() };
    this.setState(this.resetState);
    this.setState({
      playerBoard: this.player.getBoard(),
      compBoard: this.comp.getBoard(),
    });
  };
  handleAttack = (loc) => {
    const isSunk = this.player.attack(this.comp, loc);
    if (isSunk) {
      let val = this.state.compSunk + 1;
      this.setState({ compSunk: val });
    }
    this.computerAttack();
    this.takeTurnHandler();
    console.log(this.state.compSunk);
  };
  handlePlaceShip = (loc, type, orientation) => {
    const success = this.player.placeShip(loc, type, orientation);
    this.setState({
      playerBoard: this.player.getBoard(),
    });
    return success;
  };
  computerAttack = () => {
    const availableHits = this.player.getShots();
    const randomShot = Math.floor(Math.random() * availableHits.length);
    const loc = availableHits[randomShot];
    const attack = this.comp.attack(this.player, loc);
    if (attack) {
      let val = this.state.playerSunk;
      val++;
      this.setState({ playerSunk: val });
      console.log(this.state.playerSunk);
    }
  };

  takeTurnHandler = () => {
    this.setState({
      playerTurn: !this.state.playerTurn,
      compTurn: !this.state.compTurn,
    });
  };
  handleShipSelection = (type) => {
    this.state.ships.forEach((ship, i) => {
      if (Object.values(ship)[0] === type) {
        const newShips = [...this.state.ships];
        newShips.splice(i, 1);
        this.setState({ ships: newShips });
      }
    });
  };
  render() {
    const determineWinner = () => {
      if (this.state.playerSunk === 5 && this.state.gameOn) {
        this.setState({ playerWon: 'Computer won', gameOn: false });
      } else if (this.state.compSunk === 5 && this.state.gameOn) {
        this.setState({ playerWon: 'Player won', gameOn: false });
      }
    };
    determineWinner();
    return (
      <div>
        <button onClick={this.handleReset}>Reset Game</button>
        <div>{this.state.playerWon}</div>
        <DndProvider backend={HTML5Backend}>
          <div className={classes.BattleshipControls}></div>
          <BattleshipControls ships={this.state.ships} />
          <Gameboard
            board={this.state.playerBoard}
            placeShip={this.handlePlaceShip}
            selected={this.handleShipSelection}
            playerBoard
            disabled
          />
          <Gameboard
            disabled={this.state.ships.length || !this.state.gameOn}
            board={this.state.compBoard}
            attack={this.handleAttack}
            placeShip={() => false}
          />
        </DndProvider>
      </div>
    );
  }
}

export default Battleship;
