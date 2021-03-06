import gameboard from '../gameboardFactory/gameboardFactory';

const player = () => {
  const { receiveAttack, getBoard, placeShip, getShots } = gameboard();
  const attack = (enemy, loc) => {
    return enemy.receiveAttack(loc);
  };
  return { receiveAttack, getBoard, attack, placeShip, getShots };
};

export default player;
