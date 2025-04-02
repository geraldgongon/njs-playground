import React, { useState } from "react";
import { TileDetail, TileProps } from "./types";
import { StyledTile } from "./styled/styled";
import { useBoardContext } from "./BoardContext";

const Tile = ({ tile: tileProp }: TileProps): React.ReactElement<TileProps> => {
  const [tile, setTile] = useState<TileDetail>(tileProp);
  const { board, updateBoard } = useBoardContext();

  const handleClick = (e: React.MouseEvent) => {
    // if the clicked tile is a bomb, just return right away
    // and show the "you lose" messaging and reveal all the bombs
    const newBoard = revealTile([...board], tile);
    updateBoard(newBoard);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (tile.isOpen) return;
    setTile({ ...tile, isFlagged: !tile.isFlagged });
  };

  return (
    <StyledTile
      tile={tile}
      onClick={handleClick}
      onContextMenu={handleRightClick}>
      {tile.text}
    </StyledTile>
  );
};

export default Tile;

const revealTile = (
  board: TileDetail[][],
  { x, y }: TileDetail
): TileDetail[][] => {
  const currentTile = board[x][y];
  if (currentTile.isFlagged || currentTile.isOpen) return board;
  if (currentTile.isBomb) {
    currentTile.isOpen = true;
    return board;
  }

  // recurse the adjacent tiles and reveal
  const adjacent = getAdjacentTiles(board, currentTile);
  const mines = adjacent.filter((tile) => tile.isBomb);

  if (!mines.length) {
    // open the adjacent
    // BUG: THIS RECURSION DOES NOT WORK
    adjacent.forEach((tile) => {
      currentTile.isOpen = true;
      revealTile(board, tile);
    });
  } else {
    currentTile.text = mines.length.toString();
  }

  // updateAdjacentTiles(board, tile);
  return board;
};

const getAdjacentTiles = (
  board: TileDetail[][],
  { x, y }: TileDetail
): TileDetail[] => {
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

const updateAdjacentTiles = (
  board: TileDetail[][],
  currentTile: TileDetail
) => {
  const { x, y } = currentTile;

  if (!mines) {
    adjacent.forEach(updateAdjacentTiles.bind(null, board));
  } else {
    board[x][y].isOpen = true;
    board[x][y].text = mines.toString();
  }
  return board;
};
