import playerFactory from './player';

it('player attacks opponent', () => {
  const player = playerFactory();
  const comp = playerFactory();
  comp.placeShip([3, 3], 'carrier', 'vertical');
  const loc = [3, 3];
  const loc2 = [4, 3];
  const loc3 = [3, 4];
  player.attack(comp, loc);
  player.attack(comp, loc2);
  player.attack(comp, loc3);
  expect(comp.getBoard()[3][3].ship.getName()).toMatch('carrier');
  expect(comp.getBoard()[3][3].ship.isHit(0)).toBe(true);
  expect(comp.getBoard()[4][3].ship.isHit(1)).toBe(true);
  expect(comp.getBoard()[3][4].miss).toBe(true);
});
