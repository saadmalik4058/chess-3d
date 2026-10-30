import type { Vector3Tuple } from "three";

export const BOARD_FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export const BOARD_RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export type BoardFile = (typeof BOARD_FILES)[number];
export type BoardRank = (typeof BOARD_RANKS)[number];
export type SquareName = `${BoardFile}${BoardRank}`;

export const BOARD_DIMENSION = 8;
export const SQUARE_SIZE = 0.55;
export const SQUARE_GAP = 0.01;
export const SQUARE_THICKNESS = 0.03;
export const BOARD_EXTENT = BOARD_DIMENSION * SQUARE_SIZE;
export const BOARD_SURFACE_Y = 0.28;

export type BoardSquare = {
  name: SquareName;
  file: BoardFile;
  rank: BoardRank;
  fileIndex: number;
  rankIndex: number;
  isDark: boolean;
};

export function isDarkSquare(fileIndex: number, rankIndex: number) {
  return (fileIndex + rankIndex) % 2 === 0;
}

/**
 * World-space position of a square.
 * Rank 1 sits on +Z, so the default camera on +Z looks at White's side.
 */
export function squareToWorld(
  fileIndex: number,
  rankIndex: number,
  y = BOARD_SURFACE_Y,
): Vector3Tuple {
  const offset = ((BOARD_DIMENSION - 1) / 2) * SQUARE_SIZE;

  return [
    fileIndex * SQUARE_SIZE - offset,
    y,
    rankIndex * SQUARE_SIZE - offset,
  ];
}

export const BOARD_SQUARES: BoardSquare[] = BOARD_FILES.flatMap(
  (file, fileIndex) =>
    BOARD_RANKS.map((rank, rankIndex) => ({
      name: `${file}${rank}` as SquareName,
      file,
      rank,
      fileIndex,
      rankIndex,
      isDark: isDarkSquare(fileIndex, rankIndex),
    })),
);
