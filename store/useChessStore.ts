"use client";

import { create } from "zustand";
import {
  GameState,
  initGame,
  selectSquare,
  movePiece,
  undoMove,
  resetGame,
  Promotion,
  Square,
} from "@/lib/chess";

type State = GameState;

type Actions = {
  select: (square: string) => void;
  move: (from: string, to: string, promotion?: string) => void;
  undo: () => void;
  reset: () => void;
};

export const useChessStore = create<State & Actions>((set, get) => {
  const initial = initGame();

  return {
    ...initial,

    /** Pick a square – updates selectedSquare + legalMoves. */
    select: (square: string) =>
      set(
        selectSquare(initial, square as Square),
      ),

    /** Apply a move; if illegal, selection clears. */
    move: (from: string, to: string, promotion?: string) =>
      set(
        movePiece(initial, from as Square, to as Square, promotion as Promotion ?? null),
      ),

    /** Undo the last move. */
    undo: () => set(undoMove(initial)),

    /** Reset to the starting position. */
    reset: () => set(resetGame()),
  };
});