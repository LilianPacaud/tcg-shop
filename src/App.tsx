import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './style/App.css'
import Home from './screen/Home';
import { AppDispatch, RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectCartAmount } from './redux/cartSlice';
import CartDetail from './components/CartDetail';
import { ToastContainer } from 'react-toastify';

function App() {
    // Use Redux and localStorage to store cart
    const dispatch: AppDispatch = useDispatch();
    const cart = useSelector((state: RootState) => selectCart(state));
    const cartAmount = useSelector((state: RootState) => selectCartAmount(state));

  return (
    <BrowserRouter>
      <h1 className='title'>TCG SHOP</h1>
      <Routes>
        <Route path="/" element={<Home dispatch={dispatch} cart={cart} cartAmount={cartAmount} />} />
        <Route path="/cart" element={<CartDetail dispatch={dispatch} cart={cart} cartAmount={cartAmount} />} />
      </Routes>
      <ToastContainer />
  </BrowserRouter>
  );
}

export default App;
