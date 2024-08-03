import React from 'react';
import '../style/CardStyle.css'
import { useSelector } from 'react-redux';
import { addItem, removeItem, selectCardsCountById } from '../redux/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch, RootState } from '../redux/store';
import { CardType } from '../type';

interface CardProps {
  card: CardType
  dispatch: AppDispatch
}

// Component for Card item
const Card: React.FC<CardProps> = ({ card, dispatch }) => { 
  const handleAddItem = (item: CardType) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item: CardType) => {
    dispatch(removeItem(item));
  };

  const cardCounts = useSelector((state: RootState) => selectCardsCountById(card.id)(state));

  return (
    <div className='card'>
      <img alt={card.name} src={card.images.large}></img>
      <div className='infos'>
        <span>${card.cardmarket?.prices.averageSellPrice}</span>
        <div>
          <FontAwesomeIcon className='icon' icon={faPlus} onClick={() => handleAddItem(card)} />
          <span className='count'>{cardCounts}</span>
          <FontAwesomeIcon className='icon' icon={faMinus} onClick={() => handleRemoveItem(card)} />
        </div>
      </div>
    </div>
  );
};

export default Card;
