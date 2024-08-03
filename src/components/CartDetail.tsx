import { CardType, CartItem } from '../type';
import { AppDispatch } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addItem, clearCart, removeItem } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HomeProps {
    cart: CartItem[],
    dispatch: AppDispatch,
    cartAmount: number
  }

const CartDetail: React.FC<HomeProps> = ({ cart, dispatch, cartAmount }) => { 
  const navigate = useNavigate();

  const handleAddItem = (item: CardType) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item: CardType) => {
    dispatch(removeItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  

  const buy = () => {
    handleClearCart();
    toast("Thanks for your purchase !");
    navigate('/');
  }

  return (
    <div className='cartDetail'>
        <Link className='link' to="/"><FontAwesomeIcon icon={faArrowLeft}/> Back To List</Link>
        <div className='items'>
          {cart.map(cartItem => (
            <div className='item'>
              <img alt={cartItem.card.name} src={cartItem.card.images.large} />
              <div className='blockText'>
                <div>{cartItem.card.name}</div>
                <div>
                    <FontAwesomeIcon className='icon' icon={faPlus} onClick={() => handleAddItem(cartItem.card)} />
                    <span className='count'>{cartItem.count}</span>
                    <FontAwesomeIcon className='icon' icon={faMinus} onClick={() => handleRemoveItem(cartItem.card)} />
                </div>
                <div className='priceCard'>
                <span className='priceCardPrimary'>${Math.round(cartItem.card.cardmarket.prices.averageSellPrice * cartItem.count * 100) / 100}</span>
                <span>(unit: ${cartItem.card.cardmarket.prices.averageSellPrice})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='total'>total: <span className='totalPrice'>${cartAmount.toFixed(2)}</span></div>
        <div className='buy' onClick={buy}><button>buy</button></div>
    </div>
  );
}

export default CartDetail;
