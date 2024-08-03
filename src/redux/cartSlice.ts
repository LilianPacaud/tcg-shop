import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, CardType } from '../type';

// Initialize state from localStorage
const loadCart = (): CartItem[] => {
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
      const card = action.payload;
      const existingItem = state.cards.find(item => item.card.id === card.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.cards.push({ card, count: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<CardType>) => {
      const card = action.payload;
      const existingItem = state.cards.find(item => item.card.id === card.id);
      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          state.cards = state.cards.filter(item => item.card.id !== card.id);
        }
      }
    },
    clearCart: (state) => {
      state.cards = [];
    },
  },
});

export const selectCartAmount = (state: { cart: CartState }): number => {
  return state.cart.cards.reduce((total, { card, count }) => total + card.cardmarket.prices.averageSellPrice * count, 0);
};

export const selectCart = (state: { cart: CartState }): CartItem[] => state.cart.cards;

export const cardCount = (state: { cart: CartState }, card: CardType): number => {
  return state.cart.cards.find(item => item.card.id === card.id)?.count ?? 0
}

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
