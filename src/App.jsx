import { RouterProvider } from 'react-router';
import router from './route/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

//1. 전체 상품 페이지, 로그인, 상품 상세페이지
//2. 전체 상품페이지에서는 전체 상품을 볼 수 있다.
//3. 로그인 버튼을 누르면 로그인 페이지가 나온다.
//4. 상품 디테일을 눌렀으나, 로그인이 안되있을 경우 로그인페이지가 먼저 나오다.
//5. 로그인이 되어있을 경우 디테일 페이지를 볼 수 있다.
//6. 로그아웃 버튼을 클릭하면 로그아이웃이 된다.
//7. 로그아웃이 되면 상품 디테일 페이지를 볼 수 없다, 다시 로그인 페이지가 보인다.
//8. 로그인을 하면 로그아웃이 보이고, 로그아웃을 하면 로그인이 보인다.
//9. 상품을 검색할 수 있다.
function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
