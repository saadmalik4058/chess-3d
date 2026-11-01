import type { Square as ChessSquare } from "chess.js";
import { Chess } from "chess.js";

/** Square algebraic notation, e.g. "e4". Export the chess.js Square type for convenience. */
export type Square = ChessSquare;

/** Promotion piece, or null for no promotion. */
export type Promotion = "q" | "r" | "b" | "n" | null;

/** A completed move recorded in history. */
export type Move = {
  from: Square;
  to: Square;
  promotion: Promotion;
};

/** Checkmate / stalemate / draw, or null when the game is ongoing. */
export type GameStatus = "white" | "black" | "draw" | null;

/** Plain game state – no React dependency. */
export type GameState = {
  fen: string;
  turn: "w" | "b";
  selectedSquare: Square | null;
  legalMoves: Square[];
  history: Move[];
  status: GameStatus;
};

/** Start a new game (standard position). */
export function initGame(): GameState {
  const chess = new Chess();
  return {
    fen: chess.fen(),
    turn: chess.turn(),
    selectedSquare: null,
    legalMoves: chess.moves({ verbose: true }).map(m => m.to),
    history: [],
    status: null,
  };
}

/** Select a square – clears previous selection when the same square is clicked. */
export function selectSquare(state: GameState, square: Square): GameState {
  if (state.selectedSquare === square) {
    return {
      ...state,
      selectedSquare: null,
      legalMoves: [],
    };
  }

  const chess = new Chess(state.fen);
  const piece = chess.get(square);
  if (!piece || piece.color !== chess.turn()) {
    return {
      ...state,
      selectedSquare: null,
      legalMoves: [],
    };
  }

  const legal = chess.moves({ verbose: true, square }).map(
    (m) => m.to
  );
  return {
    ...state,
    selectedSquare: square,
    legalMoves: legal,
  };
}

/** Apply a move (from → to). If the move is illegal the state is unchanged
 *  (selection is cleared). */
export function movePiece(
  state: GameState,
  from: Square,
  to: Square,
  promotion: Promotion = null
): GameState {
  const chess = new Chess(state.fen);
  const move = chess.move({ from, to, promotion: promotion === null ? undefined : promotion });
  if (!move) {
    return {
      ...state,
      selectedSquare: null,
      legalMoves: [],
    };
  }

  // Determine game status.
  let status: GameStatus = null;
  if (chess.isCheckmate()) {
    // The side to move lost, so the opponent wins.
    status = chess.turn() === "w" ? "black" : "white";
  } else if (chess.isStalemate()) {
    status = "draw";
  } else if (chess.isThreefoldRepetition()) {
    status = "draw";
  } else if (chess.isDrawByFiftyMoves()) {
    status = "draw";
  }

  return {
    fen: chess.fen(),
    turn: chess.turn(),
    selectedSquare: null,
    legalMoves: chess.moves({ verbose: true }).map(m => m.to),
    history: [
      ...state.history,
      { from: move.from, to: move.to, promotion: move.promotion as Promotion },
    ],
    status,
  };
}

/** Undo the last move. When history is empty return the initial state. */
export function undoMove(state: GameState): GameState {
  if (state.history.length === 0) {
    return initGame();
  }

  const chess = new Chess(state.fen);
  chess.undo();

  let status: GameStatus = null;
  if (chess.isCheckmate()) {
    status = chess.turn() === "w" ? "black" : "white";
  } else if (chess.isStalemate()) {
    status = "draw";
  } else if (chess.isThreefoldRepetition()) {
    status = "draw";
  } else if (chess.isDrawByFiftyMoves()) {
    status = "draw";
  }

  return {
    fen: chess.fen(),
    turn: chess.turn(),
    selectedSquare: null,
    legalMoves: chess.moves({ verbose: true }).map(m => m.to),
    history: state.history.slice(0, -1),
    status,
  };
}

/** Reset the board to the starting position. */
export function resetGame(): GameState {
  return initGame();
}