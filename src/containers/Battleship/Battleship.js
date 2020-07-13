import React, { Component } from 'react';
import Gameboard from '../../components/Gameboard/Gameboard';

import playerFactory from '../../lib/player/player';

class Battleship extends Component {
  player = playerFactory();
  comp = playerFactory();

  render() {
    return (
      <div>
        <Gameboard board={this.player.getBoard()} />
        <Gameboard board={this.comp.getBoard()} />
      </div>
    );
  }
}

export default Battleship;
