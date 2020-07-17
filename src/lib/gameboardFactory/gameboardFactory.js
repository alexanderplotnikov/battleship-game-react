import Ship from '../shipFactory/shipFactory';

const gameboardFactory = () => {
  const board = new Array(10);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(10);
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = {
        miss: false,
        active: true,
        ship: false,
        index: null,
      };
    }
  }
  const availableHits = board
    .map((row, r) => {
      return row.map((_, c) => {
        return [r, c];
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  const getShots = () => [...availableHits];
  const getBoard = () => board;

  const placeShip = (loc, type, orientation = 'horizontal') => {
    if (!type) {
      throw new Error('Missing type of ship');
    } else if (!loc) {
      throw new Error('Missing loc for ship placement');
    }
    const ship = Ship(type);
    const isHorizontal = orientation === 'horizontal' ? true : false;
    const placeble = isPlaceble(loc, ship.getLength(), isHorizontal);
    if (placeble) {
      placeble.forEach(([row, col], i) => {
        board[row][col].ship = ship;
        board[row][col].index = i;
      });
      return true;
    } else {
      return false;
    }
  };
  const isPlaceble = (loc, size, isHorizontal) => {
    const [row, col] = loc;
    const coordinates = [];
    if (isHorizontal) {
      for (let i = 0; i < size; i++) {
        if (col + i > 9) return false;
        if (board[row][col + i].ship === false) {
          coordinates.push([row, col + i]);
        } else {
          return false;
        }
      }
    } else {
      for (let i = 0; i < size; i++) {
        if (row + i > 9) return false;
        if (board[row + i][col].ship === false) {
          coordinates.push([row + i, col]);
        } else {
          return false;
        }
      }
    }
    return coordinates;
  };
  const receiveAttack = ([row, col]) => {
    availableHits.forEach((arr, i) => {
      if (arr[0] === row && arr[1] === col) {
        availableHits.splice(i, 1);
      }
    });
    if (board[row][col].ship === false) {
      board[row][col].miss = true;
    } else if (typeof board[row][col].ship === 'object') {
      const index = board[row][col].index;
      board[row][col].ship.hit(index);
      return board[row][col].ship.isSunk();
    }
  };
  return { getBoard, placeShip, receiveAttack, getShots };
};

export default gameboardFactory;
