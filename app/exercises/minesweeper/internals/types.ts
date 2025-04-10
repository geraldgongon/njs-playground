export enum Levels {
  BEGINNER = "beginner",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

export type BoardProps = {
  size: number;
};

export type TileDetail = {
  x: number;
  y: number;
  text?: string;
  isFlagged: boolean;
  isMine: boolean;
  isOpen: boolean;
};

export type Board = TileDetail[][];

export type TileProps = {
  tile: TileDetail;
};

export type Coordinate = { x: number; y: number };
