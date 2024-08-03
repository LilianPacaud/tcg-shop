export interface CardType {
  id: number;
  name: string;
  images: {
    small: string
    large: string
  };
  cardmarket: {
    prices: {
      averageSellPrice: number;
    };
  };
}
  
export interface CartItem {
  card: CardType;
  count: number;
}

export interface CartState {
  cards: CartItem[];
}
  