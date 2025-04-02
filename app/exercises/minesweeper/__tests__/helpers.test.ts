import { hasBomb, plantBombs } from "../internals/helpers";
import { Coordinate } from "../page";

describe("plantBombs", () => {
  it("should build up a list of bombs", () => {
    const boardSize = 50,
      numMines = 10;
    const mines = plantBombs(boardSize, numMines);
    expect(mines.size).toEqual(10);
  });

  it("should not have any duplicates", () => {
    const boardSize = 50,
      numMines = 10;
    const mines = plantBombs(boardSize, numMines);

    expect(mines.size).toEqual(numMines);
  });
});

describe("hasBombs ", () => {
  it.each`
    set                   | x    | y    | result
    ${["21", "00", "02"]} | ${1} | ${1} | ${false}
    ${["21", "00", "02"]} | ${0} | ${2} | ${true}
  `("$set contains bomb at [$x,$y]: $result", ({ set, x, y, result }) => {
    const mines: Set<string> = new Set(set);
    const coord = `${x}${y}`;

    expect(hasBomb(mines, coord)).toEqual(result);
  });
});
