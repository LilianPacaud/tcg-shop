import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './style/App.css'
import Home from './components/Home';
import { AppDispatch, RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectCartAmount } from './redux/cartSlice';

function App() {
    // Use Redux and localStorage to store cart
    const dispatch: AppDispatch = useDispatch();
    const cart = useSelector((state: RootState) => selectCart(state));
    const cartAmount = useSelector((state: RootState) => selectCartAmount(state));

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home dispatch={dispatch} cart={cart} cartAmount={cartAmount} />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
