import gameboardFactory from './gameboardFactory';

/*
    Gameboard constructs playing field
    Gameboard places ships
      cannot overlap
      cannot go out of boundary
    Gameboard has recieveAttack method
        //input: coordinate
        // hit/miss marker
            if hit call Ship.hit()
            if miss place miss marker(grey)
    Gameboard keeps track of all ships afloat and 
        reports if all ships have been sunk
*/
const shipMock = (type) => {
  let size = type == 'carrier' ? 5 : 'Error';
  const ship = {
    name: 'carrier',
    length: size,
  };
  const getLength = () => ship.length;
  const getShip = () => ship;
  return { getLength, getShip };
};

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
  const ship = shipMock('carrier');
  const loc = [8, 3];
  mockBoard.placeShip(loc, ship.getShip());
  expect(mockBoard.getBoard()[8][7]).toBe(ship.getLength());
});
