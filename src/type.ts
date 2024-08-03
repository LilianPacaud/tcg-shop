export interface CardType {
  id: number;
  name: string;
  price: number;
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
  
export interface CartState {
  cards: CardType[];
}
  