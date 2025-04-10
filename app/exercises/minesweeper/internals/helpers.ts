import { Board, TileDetail } from "./types";

/**
 * Given the size of the board and the # of mines, generate a list of random coordinates
 * and plant the bombs along the board
 * @param boardSize The size of one edge of the board
 * @param mines number of mines to plant on the board
 * @returns Set of unique coordinates
 */
export const plantBombs = (boardSize: number, mines: number): Set<string> => {
  const mineHash = new Set<string>();

  while (mines > 0) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    const uniqueCoord = `${x}${y}`;
    if (!mineHash.has(uniqueCoord)) {
      mineHash.add(uniqueCoord);
      mines--;
    }
  }

  return mineHash;
};

/**
 * Determine if a given coordinate is a bomb.
 * @param mines Set of unique coordinates (e.g. {x:2,y:6} would show up as "26" in the set)
 * @param coord
 * @returns boolean
 */
export const hasBomb = (mines: Set<string>, coord: string): boolean =>
  mines.has(coord);

/**
 * This method is called when any tile is clicked.  If you click on a bomb, it's game over.
 * Otherwise, check how many bombs exist in the surrounding cells.  If we find bombs in surrounding
 * cells, then we just add the # of bombs in the cell.  If no mines are found in any
 * surrounding cells, then we call this function recursively on all surrounding cells.
 *
 * @param board A copy of the board object in context
 * @param tile  The current tile that was clicked on
 * @returns the updated board
 */
export const revealTile = (board: Board, { x, y }: TileDetail): Board => {
  const currentTile = board[x][y];
  if (currentTile.isFlagged || currentTile.isOpen) return board;
  if (currentTile.isBomb) {
    currentTile.isOpen = true;
    return board;
  }

  const adjacent = getAdjacentTiles(board, currentTile);
  const mines = adjacent.filter((tile) => tile.isBomb);

  if (!mines.length) {
    adjacent.forEach((tile) => {
      currentTile.isOpen = true;
      revealTile(board, tile);
    });
  } else {
    currentTile.isOpen = true;
    currentTile.text = mines.length.toString();
  }

  return board;
};

/**
 * This method finds and returns all tiles surrounding the current tile
 *
 * @param board the current board
 * @param tile The current tile
 * @returns
 */
const getAdjacentTiles = (board: Board, { x, y }: TileDetail): TileDetail[] => {
  const adjacent = [];
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) continue;
      const t = board[i]?.[j];

      if (t) adjacent.push(t);
    }
  }
  return adjacent;
};
