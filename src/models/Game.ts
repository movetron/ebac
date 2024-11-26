export interface Card {
    id: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
    uniqueId: number;
  }
  
  export interface GameState {
    cards: Card[];
    remainingTime: number;
    rows: number;
    cols: number;
    timeLimit: number;
    maxErrors: number;
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
  export interface Result {
    date: string;
    timeTaken: number;
    errors: number;
    difficulty: string;
    score: number;
  }

export interface CardType {
  id: number;
  frontImage: string;
  backImage: string;
  flipped: boolean;
  clickable: boolean;
  matchingCardId: number; 
}

