import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CartItem {
  id: number;
  name: string;
  price: number;
  cardmarket: any
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const selectTotalPrice = (state: RootState): number => {
  return state.cart.items.reduce((total, item) => total + item.cardmarket.prices.averageSellPrice, 0);
};

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
