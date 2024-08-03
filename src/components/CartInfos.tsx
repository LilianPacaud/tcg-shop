import React from 'react';
import '../style/CartStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { clearCart } from '../redux/cartSlice';
import { CartItem } from '../type';
import { AppDispatch } from '../redux/store';

interface CartInfosProps {
  cart: CartItem[],
  cartAmount: number,
}

// Component for cart infos in cards page
const CartInfos: React.FC<CartInfosProps> = ({ cart, cartAmount }) => { 
  return (
    <div className='cartInfo'>
      <FontAwesomeIcon className='icon' icon={faCartArrowDown}/>
      <span className='number'>{cart.length}</span>
      <div className='separator'></div>
      <div>${cartAmount.toFixed(2)}</div>
    </div>
  );
};

export default CartInfos;
