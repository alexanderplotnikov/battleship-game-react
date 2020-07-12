import gameboard from '../gameboardFactory/gameboardFactory';

const player = () => {
  const { receiveAttack, getBoard, placeShip } = gameboard();
  const attack = (enemy, loc) => {
    enemy.receiveAttack(loc);
  };
  return { receiveAttack, getBoard, attack, placeShip };
};

export default player;
