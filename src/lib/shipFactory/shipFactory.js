const shipFactory = (type) => {
  let size = 0;
  size =
    type == 'carrier'
      ? 5
      : type == 'battleship'
      ? 4
      : type == 'cruiser'
      ? 3
      : type == 'submarine'
      ? 3
      : type == 'destroyer'
      ? 2
      : new Error('incorrect type of ship');
  const ship = {
    length: size,
    hitStatus: new Array(size).fill(null),
  };
  const getLength = () => ship.length;
  const hit = (pos) => {
    ship.hitStatus[pos] = true;
    return ship.hitStatus;
  };
  const isSunk = () => !ship.hitStatus.includes(null);
  return { getLength, hit, isSunk };
};

export default shipFactory;
