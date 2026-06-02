import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Products from '../pages/products/Products';
import ProductDetail from '../pages/products/ProductDetail';
import News from '../pages/public/News';
import About from '../pages/public/About';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/news" element={<News />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
