import React from 'react';
import '../style/card.css'

interface CardProps {
  card: any
}

const Card: React.FC<CardProps> = ({ card }) => {  
  return (
    <img className='card' src={card.images.large}></img>
  );
};

export default Card;
