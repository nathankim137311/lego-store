import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './Home';
import Shop from './components/Shop'
import ProductPage from './components/ProductPage';
import { BagProvider } from './components/BagContext';
import CartPage from './components/CartPage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

ReactDOM.render(
  <BrowserRouter>
    <BagProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BagProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
