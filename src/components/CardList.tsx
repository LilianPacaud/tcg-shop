import '../style/CartStyle.css'
import '../style/CardStyle.css'
import { RotatingLines } from 'react-loader-spinner';
import { CardType } from '../type';
import Card from './Card';
import { AppDispatch } from '../redux/store';

interface CardListProps {
  dispatch: AppDispatch,
  data: CardType[],
  loading: boolean
}

const CardList: React.FC<CardListProps> = ({ dispatch, data, loading }) => { 
    
  // Loader on waiting API result
  if (loading) return (
    <div className='loadingElement'>
      <RotatingLines
      strokeColor="black"
      strokeWidth="1"
      animationDuration="0.75"
      width="50"
      visible={true}
      />
    </div>
  )

  return (
      <div className='cardListBlock'>
        <ul className='cardList'>
          {data.map(card => (
            <Card card={card} dispatch={dispatch} />
          ))}
        </ul>
      </div>
  );
}

export default CardList;
