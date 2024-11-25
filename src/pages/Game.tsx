import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { createBoard, CardType } from "../models/setup"; 
import { shuffleArray } from "../models/setup";
import { useGameContext } from "../context/GameContext";
const TOTAL_CARDS = 16; 
const GAME_TIME = 60;

const Game: React.FC = () => {
  const { setGameState } = useGameContext();
  const { settings, gameState } = useGameContext();
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = useState<CardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [errors, setErrors] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(GAME_TIME);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [hasExceededErrors, setHasExceededErrors] = useState(false);
  
  const startNewGame = async () => {
    const newCards = await createBoard(TOTAL_CARDS);
    setCards(newCards);
    setMatchedPairs(0);
    setErrors(0);
    setRemainingTime(GAME_TIME);
    setCurrentScore(0);
    setFirstCard(null);
    setHasExceededErrors(false); // Сброс состояния
  };

  useEffect(() => {
    startNewGame();
  }, []);
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      timeLimit: settings.timeLimit, 
      remainingTime: settings.timeLimit, 
    }));
  }, [settings]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const totalCards = gameState.rows * gameState.cols;
    const newBoard = createBoard(totalCards);
    // @ts-ignore
    setCards(newBoard);
  }, [gameState.rows, gameState.cols]);

  const endGame = (won: boolean) => {
    setGamesPlayed((prev) => prev + 1);
    setMaxScore((prev) => Math.max(prev, currentScore));
    if (won) alert("Поздравляем, вы выиграли!");
    else alert("Время вышло! Попробуйте снова.");
    startNewGame();
  };

  useEffect(() => {
    if (errors >= gameState.maxErrors && !hasExceededErrors) {
      alert("Превышено максимальное количество ошибок!");
      setHasExceededErrors(true);
    }
  }, [errors, gameState.maxErrors, hasExceededErrors]);
  
  React.useEffect(() => {
    const initializeBoard = async () => {
      const newCards = await createBoard(16); 
      setCards(shuffleArray(newCards));
      setLoading(false);
    };

    initializeBoard();
  }, []);

  const handleCardClick = (clickedCard: CardType) => {
    if (!clickedCard.clickable || firstCard?.id === clickedCard.id) return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id ? { ...card, flipped: true, clickable: false } : card
      )
    );

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else {
      if (firstCard.matchingCardId === clickedCard.id) {
        setMatchedPairs((prev) => prev + 1);
        setCurrentScore((prev) => prev + 1);
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstCard.id || card.id === clickedCard.id
              ? { ...card, clickable: false }
              : card
          )
        );
        setFirstCard(null);
      } else {
        setErrors((prev) => prev + 1);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === clickedCard.id
                ? { ...card, flipped: false, clickable: true }
                : card
            )
          );
          setFirstCard(null);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedPairs === TOTAL_CARDS / 2) {
      endGame(true);
    }
  }, [matchedPairs]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
    <div className="stats">
    <p>Сыграно игр: {gamesPlayed}</p>
        <p>Максимальный счет: {maxScore}</p>
        <p>Текущий счет: {currentScore}</p>
        <p>Осталось времени: {remainingTime} секунд</p>
        <p>Ошибки: {errors}</p>
        <p>Прогресс: {((matchedPairs / (TOTAL_CARDS / 2)) * 100).toFixed(0)}%</p>
    </div>
    <div className="grid">
      {cards.map((card) => (
        // @ts-ignore
        <Card key={card.uniqueId} card={card} callback={handleCardClick} />
      ))}
    </div>
  </div>
  );
};

export default Game;
