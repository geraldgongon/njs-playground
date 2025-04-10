import React, { useState } from "react";
import { Board, TileDetail, TileProps } from "./types";
import { StyledTile } from "./styled/styled";
import { useBoardContext } from "./BoardContext";
import { revealTile } from "./helpers";

const Tile = ({ tile: tileProp }: TileProps): React.ReactElement<TileProps> => {
  console;
  const [tile, setTile] = useState<TileDetail>(tileProp);
  const {
    board,
    updateBoard,
    updateMinesRemaining,
    setWin,
    setGameOver,
    gameOver,
  } = useBoardContext();

  const handleClick = (e: React.MouseEvent) => {
    if (tile.isOpen || gameOver) return;

    // if the clicked tile is a bomb, just return right away
    if (tile.isMine) {
      setTile((tile) => ({ ...tile, isOpen: true }));
      setGameOver(true);
      setWin(false);
      return;
    }

    const newBoard = revealTile([...board], tile);
    updateBoard(newBoard);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (tile.isOpen || gameOver) return;

    updateTile([...board], tile);
    updateMinesRemaining(tile.isFlagged ? -1 : 1);
  };

  const updateTile = (newBoard: Board, currentTile: TileDetail) => {
    newBoard[currentTile.x][currentTile.y].isFlagged = !currentTile.isFlagged;
    updateBoard(newBoard);
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
