"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Board, TileDetail } from "./types";
import { hasMine, plantMines } from "./helpers";

interface BoardContextProps {
  board: Board;
  initBoard: (boardSize: number, mines: number) => void;
  updateBoard: (board: Board) => void;
  minesRemaining: number;
  updateMinesRemaining: (addend: number) => void;
  win: boolean | undefined;
  setWin: Dispatch<SetStateAction<boolean | undefined>>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
}
const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export const BoardContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<Board>([]);
  const [win, setWin] = useState<boolean | undefined>(undefined);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [minesRemaining, setMinesRemaining] = useState<number>(0);

  const initBoard = (boardSize: number, mines: number): void => {
    // create a new board
    const newBoard: Board = [];

    // determine where to place the mines
    const bombs = plantMines(boardSize, mines);

    // create the board
    for (let i = 0; i < boardSize; i++) {
      newBoard[i] = [];
      for (let j = 0; j < boardSize; j++) {
        newBoard[i][j] = {
          x: i,
          y: j,
          isFlagged: false,
          isMine: hasMine(bombs, `${i}${j}`),
          isOpen: false,
        };
      }
    }
    setMinesRemaining(mines);
    setBoard(newBoard);
  };

  const updateBoard = (newBoard: Board): void => {
    setBoard(newBoard);
    setWinStatus(newBoard);
  };

  const setWinStatus = (board: Board): void => {
    // traverse the board.  in order to win:
    // 1. all tiles should be open
    // 2. all mines should be flagged

    const mines: TileDetail[] = [];
    board.forEach((row) =>
      row.forEach((tile) => {
        if (tile.isMine) mines.push(tile);
      })
    );

    if (mines.every((bomb) => bomb.isFlagged)) {
      setWin(true);
      setGameOver(true);
    }
  };

  const updateMinesRemaining = (addend: number) => {
    setMinesRemaining((prev) => prev + addend);
  };

  const value: BoardContextProps = {
    board,
    initBoard,
    updateBoard,
    minesRemaining,
    updateMinesRemaining,
    win,
    setWin,
    gameOver,
    setGameOver,
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
