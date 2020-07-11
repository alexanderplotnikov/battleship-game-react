const gameboardFactory = () => {
  const board = new Array(10).fill(new Array(10).fill(null));
  const getBoard = () => board;
  const placeShip = (loc, ship) => {
    const isHorizontal = true;
    const placeble = isPlaceble(loc, ship.length, isHorizontal);
    const size = ship.length;
    const [row, col] = loc;
    if (placeble) {
      if (isHorizontal) {
        for (let i = 0; i < size; i++) {
          board[row][col + i] = size;
        }
      } else {
        for (let i = 0; i < size; i++) {
          board[row + i][col] = size;
        }
      }
    }
    return 'Cannot place ship, please try again';
  };
  const isPlaceble = (loc, size, isHorizontal) => {
    const [row, col] = loc;
    if (isHorizontal) {
      for (let i = 0; i < size; i++) {
        if (!board[row][col + i] === null) return false;
      }
    } else {
      for (let i = 0; i < size; i++) {
        if (!board[row + i][col] === null) return false;
      }
    }
    return true;
  };
  return { getBoard, placeShip };
};

export default gameboardFactory;

// [[10],
//  [10],
//  [10]]
