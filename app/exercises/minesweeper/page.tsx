"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import ErrorBoundary from "./internals/ErrorBoundary";
import { hasBomb, plantBombs } from "./internals/helpers";
import { Levels, TileDetail } from "./internals/types";
import { Board } from "./internals/styled/styled";
import Tile from "./internals/Tile";
import {
  BoardContextProvider,
  useBoardContext,
} from "./internals/BoardContext";

const BoardSizes: Record<string, number> = {
  [Levels.BEGINNER]: 3,
  [Levels.ADVANCED]: 10,
  [Levels.EXPERT]: 20,
};

const Mines: Record<string, number> = {
  [Levels.BEGINNER]: 3,
  [Levels.ADVANCED]: 10,
  [Levels.EXPERT]: 25,
};

const Minesweeper = () => {
  const [difficulty, setDifficulty] = useState("");
  const { board, initBoard } = useBoardContext();

  useEffect(() => {
    if (difficulty) {
      initBoard(BoardSizes[difficulty], Mines[difficulty]);
    }
  }, [difficulty]);

  // reveal cell
  // check if win or lose

  return (
    <ErrorBoundary>
      <div>
        <h1>Minesweeper</h1>
        <select
          onChange={(e) => setDifficulty(e.target.value)}
          value={difficulty}>
          <option value="">select</option>
          <option value={"beginner"}>Beginner</option>
          <option value={"advanced"}>Advanced</option>
          <option value={"expert"}>Expert</option>
        </select>
        {board && (
          <Board size={board.length}>
            {board.map((row, x) =>
              row.map((tile, y) => <Tile key={`${x}${y}`} tile={tile} />)
            )}
          </Board>
        )}
      </div>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <BoardContextProvider>
      <Minesweeper />
    </BoardContextProvider>
  );
};

export default App;
