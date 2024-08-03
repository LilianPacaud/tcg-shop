import { CartItem } from '../type';
import { AppDispatch } from '../redux/store';

interface HomeProps {
    cart: CartItem[],
    dispatch: AppDispatch,
    cartAmount: number
  }

const CartDetail: React.FC<HomeProps> = ({ cart, dispatch, cartAmount }) => { 

  return (
    <div>
        {cart.toString()}
    </div>
  );
}

export default CartDetail;
