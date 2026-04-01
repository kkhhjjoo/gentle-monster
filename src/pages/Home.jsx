import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection/HeroSection'
import ProductCard from '../components/ProductCard/ProductCard';
import { useSearchParams } from 'react-router';
import styles from './Home.module.css';

const Home = () => {

  const [productList, setProductsList] = useState([]);
  const [query] = useSearchParams();
  const searchQuery = query.get('q');

  useEffect(() => {
    const getProducts = async () => {
      let url = searchQuery
        ? `https://my-json-server.typicode.com/kkhhjjoo/gentle-monster/products?title_contains=${searchQuery}`
        : `https://my-json-server.typicode.com/kkhhjjoo/gentle-monster/products`;
      let response = await fetch(url);
      let data = await response.json();
      setProductsList(data);
    }
    getProducts();
  }, [searchQuery]);

  return (
    <div>
      {!searchQuery && <HeroSection />}
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
