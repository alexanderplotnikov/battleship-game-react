import shipFactory from './shipFactory';

const mockShip = shipFactory('cruiser');

it('factory function creates an object', () => {
  expect(typeof mockShip).toEqual('object');
});

it('defines cruser with length 3', () => {
  expect(mockShip.getLength()).toBe(3);
});

it('hit()', () => {
  expect(mockShip.hit(2)).toEqual([null, null, true]);
});
it('isSunk()', () => {
  for (let i = 0; i < mockShip.getLength(); i++) {
    mockShip.hit(i);
  }
  expect(mockShip.isSunk()).toBeTruthy();
});
