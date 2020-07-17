import gameboardFactory from './gameboardFactory';

it('constructs 10 by 10 battlefield', () => {
  const mockBoard = gameboardFactory();
  const board = mockBoard.getBoard();
  const mockCell = { miss: false, active: true, ship: false, index: null };
  //check if valid array
  expect(typeof mockBoard).toEqual('object');
  //check row length
  expect(board.length).toBe(10);
  //check column length
  expect(board[0].length).toBe(10);
  //check if random place in the array is null
  expect(board[4][5]).toEqual(mockCell);
});

it('ship placed on gameboard', () => {
  const mockBoard = gameboardFactory();
  const loc = [0, 0];
  mockBoard.placeShip(loc, 'carrier');
  const board = mockBoard.getBoard();
  expect(board[0][0].ship.getLength()).toEqual(5);
});

it('target missed', () => {
  const mockBoard = gameboardFactory();
  mockBoard.receiveAttack([1, 3]);
  expect(mockBoard.getBoard()[1][3].miss).toBe(true);
});
it('target hit Carrier ship', () => {
  const mockBoard = gameboardFactory();
  const loc = [8, 3];
  const loc2 = [7, 3];
  mockBoard.placeShip(loc, 'carrier');
  mockBoard.placeShip(loc2, 'cruiser');
  expect(mockBoard.getBoard()[8][3].ship.getName()).toMatch('carrier');
  mockBoard.receiveAttack([8, 3]);
  mockBoard.receiveAttack([8, 5]);
  console.log(mockBoard.getBoard()[8]);
  expect(mockBoard.getBoard()[8][3].ship.isHit(0)).toBeTruthy();
  expect(mockBoard.getBoard()[8][3].ship.isHit(1)).toBeFalsy();
  expect(mockBoard.getBoard()[8][5].ship.isHit(2)).toBeTruthy();
  mockBoard.receiveAttack([7, 4]);
  expect(mockBoard.getBoard()[7][3].ship.isHit(1)).toBeTruthy();
});
it('target is sunk', () => {
  const mockBoard = gameboardFactory();
  const loc = [0, 0];
  mockBoard.placeShip(loc, 'cruiser');
  mockBoard.receiveAttack([0, 0]);
  mockBoard.receiveAttack([0, 1]);
  mockBoard.receiveAttack([6, 1]);
  const isSunk = mockBoard.receiveAttack([0, 2]);
  expect(mockBoard.getBoard()[0][0].ship.isSunk()).toBeTruthy();
  expect(mockBoard.getBoard()[6][1].miss).toBe(true);
  expect(mockBoard.getBoard()[7][1].ship).toEqual(false);
  expect(mockBoard.getBoard()[7][1].miss).toEqual(false);
});
