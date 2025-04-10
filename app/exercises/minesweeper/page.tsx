"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import ErrorBoundary from "./internals/ErrorBoundary";
import { Levels } from "./internals/types";
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

  const { board, initBoard, minesRemaining, win } = useBoardContext();
  useEffect(() => {
    if (difficulty) {
      initBoard(BoardSizes[difficulty], Mines[difficulty]);
      initBoard(10, 3);
    }
  }, [difficulty]);

  return (
    <ErrorBoundary>
      <div>
        <h1>Minesweeper</h1>

        <h2>{win ? "you win" : win === false ? "you lose" : ""}</h2>
        <select
          onChange={(e) => setDifficulty(e.target.value)}
          value={difficulty}>
          <option value="">select</option>
          <option value={"beginner"}>Beginner</option>
          <option value={"advanced"}>Advanced</option>
          <option value={"expert"}>Expert</option>
        </select>
        <div>Bombs remaining: {minesRemaining} </div>
        {board && (
          <Board size={board.length}>
            {board.map((row, x) =>
              row.map((tile, y) => <Tile key={`${x}${y}`} tile={tile} />)
            )}
          </Board>
        )}
      </div>
      <div>
        <h2>Instructions</h2>
        <p>
          The purpose of the game is to open all the cells of the board which do
          not contain a bomb. You lose if you set off a bomb cell. Every
          non-bomb cell you open will tell you the total number of bombs in the
          eight neighboring cells. Once you are sure that a cell contains a
          bomb, you can right-click to put a flag it on it as a reminder. Once
          you have flagged all the bombs around an open cell, you can quickly
          open the remaining non-bomb cells by shift-clicking on the cell.
        </p>
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
