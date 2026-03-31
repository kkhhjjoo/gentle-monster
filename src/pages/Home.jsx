import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection/HeroSection'
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './Home.module.css';

const Home = () => {

  const [productList, setProductsList] = useState([]);
  const getProducts = async () => {
    let url = `http://localhost:5000/products`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setProductsList(data);
  }

  useEffect(() => {
    getProducts()
   }, []);
  return (
    <div>
      <HeroSection />
      <section>
        <ul className={styles.productList}>
          {productList.map((product) => (
            <li key={product.id}><ProductCard item={product} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Home
