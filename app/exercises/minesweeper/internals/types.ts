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
  isBomb: boolean;
  isOpen: boolean;
};

export type TileProps = {
  tile: TileDetail;
};

export type Coordinate = { x: number; y: number };
