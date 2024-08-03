import { Middleware } from '@reduxjs/toolkit';
import { CartState } from '../type';

const localStorageMiddleware: Middleware = store => next => (action: any) => {
  const result = next(action);
  if (action.type.startsWith('cart/')) {
    const state = store.getState();
    const cart: CartState['cards'] = state.cart.cards;
    const totalPrice = cart.reduce((total, { card, count }) => total + card.cardmarket.prices.averageSellPrice * count, 0);

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toString());
  }

  return result;
};

export default localStorageMiddleware;
