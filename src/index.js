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

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/shop/:id' element={<ProductPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
