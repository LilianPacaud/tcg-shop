import React from 'react';
import '../style/card.css'
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faEye } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  card: any
}

const Card: React.FC<CardProps> = ({ card }) => { 
  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addItem(product));
  };
 
  return (
    <div className='card'>
      <img style={{ width:"100%"}} src={card.images.large}></img>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <FontAwesomeIcon icon={faEye} style={{ cursor: 'pointer'}}/>
        <FontAwesomeIcon icon={faCartArrowDown} style={{ cursor: 'pointer'}} onClick={() => handleAddToCart(card)} />
      </div>
    </div>
  );
};

export default Card;
