import React from 'react';
import '../style/CartStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { clearCart } from '../redux/cartSlice';
import { CardType } from '../type';
import { AppDispatch } from '../redux/store';

interface CartInfosProps {
  cart: CardType[],
  cartAmount: number,
  dispatch: AppDispatch
}

// Component for cart infos in cards page
const CartInfos: React.FC<CartInfosProps> = ({ cart, cartAmount, dispatch }) => { 
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  return (
    <div className='cartInfo'>
      <FontAwesomeIcon className='icon' icon={faCartArrowDown}/>
      <span className='number'>{cart.length}</span>
      <FontAwesomeIcon className='close' onClick={() => handleClearCart()} icon={faClose} color='#ff5a5a'/>
      <div className='separator'></div>
      <div>${cartAmount.toFixed(2)}</div>
    </div>
  );
};

export default CartInfos;
