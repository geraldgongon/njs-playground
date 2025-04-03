import React, { useState } from "react";
import { TileDetail, TileProps } from "./types";
import { StyledTile } from "./styled/styled";
import { useBoardContext } from "./BoardContext";
import { revealTile } from "./helpers";

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
