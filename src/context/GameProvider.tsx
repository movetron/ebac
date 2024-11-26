// context/GameProvider.tsx
import React, { useState, useEffect, ReactNode } from "react";
import { GameContext } from "../context/GameContext";
import { GameState, Settings } from "../models/Game";

const initialSettings: Settings = {
  gridSize: [4, 4],
  maxErrors: 5,
  timeLimit: 60,
};

const initialGameState: GameState = {
  cards: [],
  remainingTime: initialSettings.timeLimit,
  errors: 0,
  score: 0,
  matchedPairs: 0,
  maxScore: 0,
  gamesPlayed: 0,
  rows: initialSettings.gridSize[0], 
  cols: initialSettings.gridSize[1], 
  timeLimit: initialSettings.timeLimit, 
  maxErrors: initialSettings.maxErrors, 
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    
    const savedSettings = localStorage.getItem("settings");
    return savedSettings ? JSON.parse(savedSettings) : initialSettings;
  });

  const [gameState, setGameState] = useState<GameState>(() => {
    const savedGameState = sessionStorage.getItem("gameState");
    return savedGameState ? JSON.parse(savedGameState) : initialGameState;
  });

  const updateSettings = (newSettings: Settings) => setSettings(newSettings);

  const resetGameState = () => setGameState({
    ...initialGameState,
    remainingTime: settings.timeLimit, 
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    sessionStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  return (
    <GameContext.Provider
    // @ts-ignore
      value={{ settings, gameState, updateSettings, resetGameState, setGameState }}
    >
      {children}
    </GameContext.Provider>
  );
};