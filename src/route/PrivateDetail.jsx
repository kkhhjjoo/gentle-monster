import { Navigate } from 'react-router';
import ProductDetail from '../pages/ProductDetail/ProductDetail';

const PrivateDetail = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  return isLoggedIn ? <ProductDetail /> : <Navigate to="/login" />;
}

export default PrivateDetail
