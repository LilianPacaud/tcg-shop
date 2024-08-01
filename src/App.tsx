import { useEffect, useState } from 'react';
import './App.css';
import { RotatingLines } from 'react-loader-spinner';
import Card from './components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.pokemontcg.io/v2/cards?page=${currentPage.toString()}&select=id,name,images&pageSize=100`, {
          method: 'GET',
          headers: {
            'X-Api-Key': '5dc1c464-5607-4110-85a0-d6821c699162'
          }
        })
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
    <div style={{width: '100%'}}>
    <ul className='cardList'>
      {data.map(card => (
        <Card card={card}></Card>
      ))}
    </ul>
    <div className='divBtnPage'>
      <button className='btnPage'
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button className='btnPage'
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
        disabled={currentPage === totalPages}
      >
         <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  </div>
  );
}

export default App;
