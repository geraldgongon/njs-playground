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

export const hasBomb = (mines: Set<string>, coord: string): boolean =>
  mines.has(coord);
