import '../style/CartStyle.css'
import '../style/CardStyle.css'
import { RotatingLines } from 'react-loader-spinner';
import { CardType } from '../type';
import Card from './Card';
import { AppDispatch, RootState } from '../redux/store';
import { selectSearchQuery } from '../redux/searchSlice';
import { useSelector } from 'react-redux';

interface CardListProps {
  dispatch: AppDispatch,
  data: CardType[],
  loading: boolean
}

const CardList: React.FC<CardListProps> = ({ dispatch, data, loading }) => { 

  const searchQuery = useSelector((state: RootState) => selectSearchQuery(state));

  const filteredItems = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    
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
          {filteredItems.map(card => (
            <Card card={card} dispatch={dispatch} />
          ))}
        </ul>
      </div>
  );
}

export default CardList;
