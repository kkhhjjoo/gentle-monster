import styles from './ProductCard.module.css';
const ProductCard = ({ item }) => {
  return (
    <div className={styles.card}>
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
