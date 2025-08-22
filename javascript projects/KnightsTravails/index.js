
const moves = [
  [2, 1], [1, 2],
  [-1, 2], [-2, 1],
  [-2, -1], [-1, -2],
  [1, -2], [2, -1]
];


function isValid(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}


function knightMoves(start, end) {
  if (start[0] === end[0] && start[1] === end[1]) {
    console.log(`You are already at [${end}]!`);
    return [start];
  }


  let queue = [[start, [start]]];
  let visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    let [current, path] = queue.shift();
    let [x, y] = current;

    if (x === end[0] && y === end[1]) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach(pos => console.log(`[${pos}]`));
      return path;
    }

    
    for (let [dx, dy] of moves) {
      let newX = x + dx;
      let newY = y + dy;

      if (isValid(newX, newY) && !visited.has([newX, newY].toString())) {
        visited.add([newX, newY].toString());
        queue.push([[newX, newY], [...path, [newX, newY]]]);
      }
    }
  }
  return null;
}
knightMoves([0, 0], [1, 2]); 
knightMoves([0, 0], [3, 3]); 
knightMoves([3, 3], [0, 0]); 
knightMoves([0, 0], [7, 7]); 
knightMoves([3, 3], [4, 3]);
