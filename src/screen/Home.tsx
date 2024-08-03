import { useEffect, useState } from 'react';
import CartInfos from '../components/CartInfos';
import ButtonsPage from '../components/ButtonsPage';
import CardList from '../components/CardList';
import { CardType, CartItem } from '../type';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import '../style/CartStyle.css'

interface HomeProps {
    cart: CartItem[],
    dispatch: AppDispatch,
    cartAmount: number
  }

const Home: React.FC<HomeProps> = ({ cart, dispatch, cartAmount }) => { 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CardType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const apiUrl = process.env.REACT_APP_API_URL;
    
      // Call API to get all Cards by page
      const fetchData = async () => {
        let search = searchTerm ? `q=name:${searchTerm}*` : ''
        setLoading(true);
        try {
          const response = await fetch(`${apiUrl}?page=${currentPage.toString()}&select=id,name,images,cardmarket&pageSize=100&orderBy=number&${search}`, {
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

    useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchData();
  };

  return (
      <div className='main'>
        <Link className='link' to="/cart"><CartInfos cart={cart} cartAmount={cartAmount}/></Link>
        <input
          type="text"
          className='searchBar'
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <CardList dispatch={dispatch} data={data} loading={loading}/>
        <ButtonsPage setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
      </div>
  );
}

export default Home;
