import Ship from '../shipFactory/shipFactory';

const gameboardFactory = () => {
  const board = new Array(10);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(10).fill(null);
  }
  const missedAttack = [];
  const getBoard = () => board;

  const placeShip = (loc, type, orientation = 'horizontal') => {
    const ship = Ship(type);
    const isHorizontal = orientation === 'horizontal' ? true : false;
    const placeble = isPlaceble(loc, ship.getLength(), isHorizontal);

    if (placeble) {
      placeble.forEach(([row, col], i) => {
        board[row][col] = { index: i, ship };
      });
    } else {
      return 'Cannot place ship, please try again';
    }
  };
  const isPlaceble = (loc, size, isHorizontal) => {
    const [row, col] = loc;
    const coordinates = [];
    if (isHorizontal) {
      for (let i = 0; i < size; i++) {
        if (board[row][col + i] === null) {
          coordinates.push([row, col + i]);
        } else {
          return false;
        }
      }
    } else {
      for (let i = 0; i < size; i++) {
        if (board[row + i][col] === null) {
          coordinates.push([row + i, col]);
        } else {
          return false;
        }
      }
    }
    return coordinates;
  };
  const receiveAttack = ([row, col]) => {
    if (board[row][col] === null) {
      board[row][col] = 'miss';
      missedAttack.push([row][col]);
    } else if (typeof board[row][col] === 'object') {
      const index = board[row][col].index;
      return board[row][col].ship.hit(index);
    }
  };
  return { getBoard, placeShip, receiveAttack };
};

export default gameboardFactory;
