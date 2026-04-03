import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList } from '../features/product/productSlice'
import HeroSection from '../components/HeroSection/HeroSection'
import ProductCard from '../components/ProductCard/ProductCard';
import { useSearchParams } from 'react-router';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const [query] = useSearchParams();
  const searchQuery = query.get('q');

  useEffect(() => {
    dispatch(getProductList(searchQuery ? { name: searchQuery } : {}));
  }, [searchQuery, dispatch]);

  return (
    <div>
      {!searchQuery && <HeroSection />}
      <section>
        <ul className={styles.productList}>
          {productList.map((product) => (
            <li key={product._id}><ProductCard item={product} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Home
