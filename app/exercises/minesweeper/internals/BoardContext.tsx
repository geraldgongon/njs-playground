import { createContext, useContext, useState } from "react";
import { TileDetail } from "./types";
import { hasBomb, plantBombs } from "./helpers";

interface BoardContextProps {
  board: TileDetail[][];
  initBoard: (boardSize: number, mines: number) => void;
  updateBoard: (board: TileDetail[][]) => void;
  minesRemaining: number;
}
const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export const BoardContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<TileDetail[][]>([]);
  const [minesRemaining, setMinesRemaining] = useState<number | undefined>(
    undefined
  );

  const initBoard = (boardSize: number, mines: number): void => {
    // create a new board
    const board: TileDetail[][] = [];

    // determine where to place the bombs
    const bombs = plantBombs(boardSize, mines);

    // create the board
    for (let i = 0; i < boardSize; i++) {
      board[i] = [];
      for (let j = 0; j < boardSize; j++) {
        board[i][j] = {
          x: i,
          y: j,
          isFlagged: false,
          isBomb: hasBomb(bombs, `${i}${j}`),
          isOpen: false,
        };
      }
    }
    setMinesRemaining(mines);
    setBoard(board);
  };

  const updateBoard = (newBoard: TileDetail[][]): void => {
    console.log("new board:", newBoard);
    setBoard(newBoard);
  };

  const value: BoardContextProps = {
    board,
    initBoard,
    updateBoard,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context)
    throw new Error(
      "useBoardContext must be used within a BoardContextProvider"
    );

  return context;
};
