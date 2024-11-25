import React from "react";
type CardProps = {
  card: {
    id: string;
    flipped: boolean;
    backImage: string;
    frontImage: string;
    clickable: boolean;
  };
  callback: (card: CardProps["card"]) => void;
};

const Card: React.FC<CardProps> = ({ card, callback }) => (
   <div
    className={`card ${card.flipped ? "flipped" : ""}`}
    onClick={() => callback(card)}
  >
    <img
      src={card.flipped ? card.frontImage : card.backImage}
      alt="card"
      className="card-image"
    />
  </div>
);

export default Card;
