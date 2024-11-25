import React, { createContext, useContext, useState } from "react";

export interface GameState {
  rows: number;
  cols: number;
  timeLimit: number;
  maxErrors: number;
  remainingTime: number;
  errors: number;
  score: number;
  matchedPairs: number;
  maxScore: number;
  gamesPlayed: number;
}
export interface Settings {
  gridSize: [number, number];
  maxErrors: number;
  timeLimit: number;
}
interface GameContextProps {
  settings: Settings;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined); // Добавлен экспорт

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    rows: 4,
    cols: 4,
    timeLimit: 60,
    maxErrors: 5,
    remainingTime: 60,
    errors: 0,
    score: 0,
    matchedPairs: 0,
    maxScore: 0,
    gamesPlayed: 0,
  });

  return (
    // @ts-ignore
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
