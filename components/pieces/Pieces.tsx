"use client";

import { Piece, PieceColor, PieceType } from "./Piece";

type StartingPiece = {
  type: PieceType;
  color: PieceColor;
  fileIndex: number;
  rankIndex: number;
};

const STARTING_POSITION: StartingPiece[] = [
  // White
  { type: "rook", color: "white", fileIndex: 0, rankIndex: 0 },
  { type: "knight", color: "white", fileIndex: 1, rankIndex: 0 },
  { type: "bishop", color: "white", fileIndex: 2, rankIndex: 0 },
  { type: "queen", color: "white", fileIndex: 3, rankIndex: 0 },
  { type: "king", color: "white", fileIndex: 4, rankIndex: 0 },
  { type: "bishop", color: "white", fileIndex: 5, rankIndex: 0 },
  { type: "knight", color: "white", fileIndex: 6, rankIndex: 0 },
  { type: "rook", color: "white", fileIndex: 7, rankIndex: 0 },
  { type: "pawn", color: "white", fileIndex: 0, rankIndex: 1 },
  { type: "pawn", color: "white", fileIndex: 1, rankIndex: 1 },
  { type: "pawn", color: "white", fileIndex: 2, rankIndex: 1 },
  { type: "pawn", color: "white", fileIndex: 3, rankIndex: 1 },
  { type: "pawn", color: "white", fileIndex: 4, rankIndex: 1 },
  { type: "pawn", color: "white", fileIndex: 5, rankIndex: 1 },
  { type: "pawn", color: "white", fileIndex: 6, rankIndex: 1 },
  { type: "pawn", color: "white", fileIndex: 7, rankIndex: 1 },

  // Black
  { type: "rook", color: "black", fileIndex: 0, rankIndex: 7 },
  { type: "knight", color: "black", fileIndex: 1, rankIndex: 7 },
  { type: "bishop", color: "black", fileIndex: 2, rankIndex: 7 },
  { type: "queen", color: "black", fileIndex: 3, rankIndex: 7 },
  { type: "king", color: "black", fileIndex: 4, rankIndex: 7 },
  { type: "bishop", color: "black", fileIndex: 5, rankIndex: 7 },
  { type: "knight", color: "black", fileIndex: 6, rankIndex: 7 },
  { type: "rook", color: "black", fileIndex: 7, rankIndex: 7 },
  { type: "pawn", color: "black", fileIndex: 0, rankIndex: 6 },
  { type: "pawn", color: "black", fileIndex: 1, rankIndex: 6 },
  { type: "pawn", color: "black", fileIndex: 2, rankIndex: 6 },
  { type: "pawn", color: "black", fileIndex: 3, rankIndex: 6 },
  { type: "pawn", color: "black", fileIndex: 4, rankIndex: 6 },
  { type: "pawn", color: "black", fileIndex: 5, rankIndex: 6 },
  { type: "pawn", color: "black", fileIndex: 6, rankIndex: 6 },
  { type: "pawn", color: "black", fileIndex: 7, rankIndex: 6 },
];

export function Pieces() {
  return (
    <group>
      {STARTING_POSITION.map((piece) => (
        <Piece
          key={`${piece.color}-${piece.type}-${piece.fileIndex}-${piece.rankIndex}`}
          type={piece.type}
          color={piece.color}
          fileIndex={piece.fileIndex}
          rankIndex={piece.rankIndex}
        />
      ))}
    </group>
  );
}
