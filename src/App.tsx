import { useEffect, useState } from 'react';
import './style/App.css';
import './style/CartStyle.css'
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectCartAmount } from './redux/cartSlice';
import { AppDispatch, RootState } from './redux/store';
import { CardType } from './type';
import CartInfos from './components/CartInfos';
import ButtonsPage from './components/ButtonsPage';
import Card from './components/Card';

function App() {
  const [data, setData] = useState<CardType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Call API to get all Cards by page
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}?page=${currentPage.toString()}&select=id,name,images,cardmarket&pageSize=100`, {
          method: 'GET',
          headers: {
            'X-Api-Key': process.env.REACT_APP_API_KEY ?? ''
          }
        })
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const result = await response.json();
        setData(result.data);
        setTotalPages(Math.ceil(parseInt(result.totalCount) / parseInt(result.pageSize)));
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Use Redux and localStorage to store cart
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector((state: RootState) => selectCart(state));
  const cartAmount = useSelector((state: RootState) => selectCartAmount(state));

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
      <div className='main'>
        <h1 className='title'>TCG SHOP</h1>
        <CartInfos cart={cart} cartAmount={cartAmount} dispatch={dispatch}/>
        <ul className='cardList'>
          {data.map(card => (
            <Card card={card} dispatch={dispatch} />
          ))}
        </ul>
        <ButtonsPage setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
      </div>
  );
}

export default App;
