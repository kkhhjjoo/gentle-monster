import { Navigate } from 'react-router';
import UserPage from './pages/UserPage/UserPage';

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <UserPage /> : <Navigate to="/login" />;
}

export default PrivateRoute