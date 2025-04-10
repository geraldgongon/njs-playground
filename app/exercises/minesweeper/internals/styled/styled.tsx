import { styled } from "@mui/material";
import { BoardProps, TileProps } from "../types";

export const Board = styled("div")`
  display: grid;

  ${({ size }: BoardProps) => `
    grid-template: repeat(${size}, 50px) / repeat(${size}, 50px)
  `};
  gap: 5px;

  div {
    border: 1px solid lightgrey;

    &.bomb {
      background-color: red;
    }
  }
`;

export const StyledTile = styled("div")`
  ${({ tile: { isFlagged, isOpen, isMine } }: TileProps) => `
    background-color: ${
      isOpen && isMine
        ? "red"
        : isFlagged
          ? "yellow"
          : isOpen
            ? "darkgrey"
            : "lightgrey"
    };
    cursor: ${!isOpen && "pointer"};
    display: flex;
    align-items: center;
    justify-content: center;

  `}
`;
