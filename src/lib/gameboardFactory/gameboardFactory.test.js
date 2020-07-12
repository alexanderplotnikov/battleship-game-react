import gameboardFactory from './gameboardFactory';
import shipMock from '../shipFactory/shipFactory';

it('constructs 10 by 10 battlefield', () => {
  const mockBoard = gameboardFactory();
  const board = mockBoard.getBoard();
  //check if valid array
  expect(typeof mockBoard).toEqual('object');
  //check row length
  expect(board.length).toBe(10);
  //check column length
  expect(board[0].length).toBe(10);
  //check if random place in the array is null
  expect(board[4][5]).toEqual(null);
});

it('ship placed on gameboard', () => {
  const mockBoard = gameboardFactory();
  const loc = [8, 3];
  mockBoard.placeShip(loc, 'carrier');
  expect(mockBoard.getBoard()[8][7].ship.getLength()).toBe(5);
});

it('target missed', () => {
  const mockBoard = gameboardFactory();
  mockBoard.receiveAttack([1, 3]);
  expect(mockBoard.getBoard()[1][3]).toMatch('miss');
});
it('target hit carrier', () => {
  const mockBoard = gameboardFactory();
  const loc = [8, 3];
  const loc2 = [7, 3];
  mockBoard.placeShip(loc, 'carrier');
  mockBoard.placeShip(loc2, 'cruiser');
  expect(mockBoard.getBoard()[8][3].ship.getName()).toMatch('carrier');
  mockBoard.receiveAttack([8, 3]);
  mockBoard.receiveAttack([8, 5]);
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
  expect(mockBoard.getBoard()[6][1]).toMatch('miss');
  expect(mockBoard.getBoard()[7][1]).toEqual(null);
});
