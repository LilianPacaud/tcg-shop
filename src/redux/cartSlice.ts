import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CardType } from '../type';

// Initialize state from localStorage
const loadCart = (): CardType[] => {
  const savedCards = localStorage.getItem('cart');
  return savedCards ? JSON.parse(savedCards) : [];
};

const initialState: CartState = {
  cards: loadCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CardType>) => {
      state.cards.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<CardType>) => {
      const { id } = action.payload;
      const index = state.cards.findIndex(card => card.id === id);
      if (index !== -1) {
        state.cards.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cards = [];
    },
  },
});

export const selectCartAmount = (state: { cart: CartState }): number => {
  return state.cart.cards.reduce((total, item) => total + item.cardmarket.prices.averageSellPrice, 0);
};

export const selectCart = (state: { cart: CartState }): CardType[] => state.cart.cards;
export const { addItem, removeItem, clearCart } = cartSlice.actions;

export const selectCardsCountById = (id: number) => (state: { cart: CartState }): number => {
  return state.cart.cards.filter(card => card.id === id).length;
};

export default cartSlice.reducer;
