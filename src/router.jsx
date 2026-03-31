import { createBrowserRouter } from 'react-router';
import Layout from './Layout';
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path : 'login', element: <Login />},
      { path: 'product/:id', element: <ProductDetail /> }
    ]
  }
]);

export default router;