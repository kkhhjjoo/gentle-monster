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
        <img src={item?.img} alt={item?.title} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{item?.title}</div>
        <div className={styles.price}>₩{item?.price}</div>
        <div>{item?.new === true? '신제품' : ''}</div>
      </div>
    </div>
  )
}

export default ProductCard
