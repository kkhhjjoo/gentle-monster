import { createBrowserRouter } from 'react-router';
import Layout from '../Layout';
import Home from "../pages/Home";
import Login from '../pages/Login/Login';
import PrivateRoute from '../PrivateRoute';
import PrivateDetail from './PrivateDetail';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path : 'login', element: <Login />},
      { path: 'product/:id', element: <PrivateDetail /> },
       { path: 'user', element: <PrivateRoute />}
    ]
  }
]);

export default router;