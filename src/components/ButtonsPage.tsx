import React from 'react';
import '../style/ButtonsPageStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ButtonsPageProps {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage: number,
    totalPages: number
  }

// Component for navigation buttons
const ButtonsPage: React.FC<ButtonsPageProps> = ({ setCurrentPage, currentPage, totalPages }) => { 
  return (
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
  );
};

export default ButtonsPage;
