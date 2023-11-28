const knightMoves = (startArr, endArr) => {
  const positionIsOnBoard = (row, column) =>
    !(row < 0 || column < 0 || row > 7 || column > 7);

  // Take in array and transform to board position name
  const getPosition = (arr) => arr[0].toString() + arr[1].toString();

  const createAdjacencyBoard = (rows = 8, columns = 8) => {
    const board = {};
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        const posName = getPosition([i, j]);
        // add valid positions given each location
        const adjacentPositions = [];
        if (positionIsOnBoard(i + 1, j + 2))
          adjacentPositions.push([i + 1, j + 2]);
        if (positionIsOnBoard(i + 2, j + 1))
          adjacentPositions.push([i + 2, j + 1]);
        if (positionIsOnBoard(i + 1, j - 2))
          adjacentPositions.push([i + 2, j - 1]);
        if (positionIsOnBoard(i + 2, j - 1))
          adjacentPositions.push([i + 1, j + 2]);
        if (positionIsOnBoard(i - 1, j + 2))
          adjacentPositions.push([i - 1, j + 2]);
        if (positionIsOnBoard(i - 2, j + 1))
          adjacentPositions.push([i - 2, j + 1]);
        if (positionIsOnBoard(i - 1, j - 2))
          adjacentPositions.push([i - 1, j - 2]);
        if (positionIsOnBoard(i - 2, j - 1))
          adjacentPositions.push([i - 2, j - 1]);
        board[posName] = adjacentPositions;
      }
    }
    return board;
  };
  const gameBoard = createAdjacencyBoard();

  const getMoves = (start, end, board = gameBoard) => {
    if (start === end) return [start];
    const startPos = getPosition(start);
    const endPos = getPosition(end);
    const queue = [startPos];
    const prev = { [startPos]: null };

    while (queue.length) {
      let currPos = queue.shift();
      if (currPos === endPos) {
        const positionPath = [];

        while (currPos) {
          positionPath.unshift(currPos);
          currPos = prev[currPos];
        }

        const pathOutput = [];
        for (let i = 0; i < positionPath.length; i += 1) {
          pathOutput[i] = positionPath[i].split("").map(Number);
        }
        return pathOutput;
      }

      if (currPos in board) {
        board[currPos].forEach((value) => {
          const valuePos = getPosition(value);
          if (!(valuePos in prev)) {
            prev[valuePos] = currPos;
            queue.push(valuePos);
          }
        });
      }
    }
    return null;
  };

  return getMoves(startArr, endArr);
};

export default knightMoves;

/*
  [
    [0,1,2,3,4,5,6,7],
    [0,1,2,3,4,5,6,7],
    [0,1,2,3,4,5,6,7],
    [0,1,2,3,4,5,6,7],
    [0,1,2,3,4,5,6,7],
    [0,1,2,3,4,5,6,7],
  ]

*/
