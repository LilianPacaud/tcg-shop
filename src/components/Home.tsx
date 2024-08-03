import { useEffect, useState } from 'react';
import CartInfos from './CartInfos';
import ButtonsPage from './ButtonsPage';
import CardList from './CardList';
import { CardType } from '../type';

const Home: React.FC<any> = ({ cart, dispatch, cartAmount }) => { 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CardType[]>([]);

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

  return (
      <div className='main'>
        <h1 className='title'>TCG SHOP</h1>
        <CartInfos cart={cart} cartAmount={cartAmount} dispatch={dispatch}/>
        <CardList dispatch={dispatch} data={data} loading={loading}/>
        <ButtonsPage setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
      </div>
  );
}

export default Home;
