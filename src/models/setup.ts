import cardBack from '../assets/card_back.jpg';

const API_URL = "https://api.unsplash.com/photos/random";
const CLIENT_ID = "DkiPm2WtvKQagJt9emgeRQBYmoTw3kpCXMdg1VEiC8k";
export interface CardType {
    id: number;
    frontImage: string;
    backImage: string;
    flipped: boolean;
    clickable: boolean;
    matchingCardId: number; 
    uniqueId: number; 
  }
  interface ApiResponseItem {
    urls: {
      small: string;
    };
  }

export const createBoard = async (totalCards: number): Promise<CardType[]> => {
  const response = await fetch(`${API_URL}?count=${totalCards / 2}&client_id=${CLIENT_ID}`);
  const data: ApiResponseItem[] = await response.json();

  const cards: CardType[] = data.map((item, index) => ({
    id: index,
    frontImage: item.urls.small, 
    backImage: cardBack, 
    flipped: false,
    clickable: true,
    matchingCardId: index + totalCards / 2,
     uniqueId: index, 
  }));
  const duplicatedCards = cards.map(card => ({
    ...card,
    id: card.matchingCardId, 
    uniqueId: card.uniqueId + totalCards, 
  }));
  return shuffleArray([...cards, ...duplicatedCards]);
};


export const shuffleArray = (array: CardType[]): CardType[] =>
  [...array].sort(() => Math.random() - 0.5);
