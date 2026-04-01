import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showDetail = () => { 
    navigate(`/product/${item.id}`)
  }
  return (
    <div className={styles.card} onClick={showDetail}>
      <div className={styles.imageWrapper}>
        {item?.new === true && <span className={styles.newLabel}>NEW</span>}
        <img src={item?.img} alt={item?.title} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{item?.title}</div>
        <div className={styles.price}>₩{item?.price}</div>
      </div>
    </div>
  )
}

export default ProductCard
