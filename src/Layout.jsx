import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import styles from './Layout.module.css';
import Footer from './components/Footer/Footer';

const Layout = () => { 
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;