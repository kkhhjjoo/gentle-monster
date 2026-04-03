import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showDetail = () => { 
    navigate(`/product/${item._id}`)
}
  return (
    <div className={styles.card} onClick={showDetail}>
      <div className={styles.imageWrapper}>
        {item?.isNew === true && <span className={styles.newLabel}>NEW</span>}
        <img src={item?.image} alt={item?.name} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{item?.name}</div>
        <div className={styles.price}>₩{item?.price}</div>
      </div>
    </div>
  )
}

export default ProductCard
