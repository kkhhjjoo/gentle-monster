import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../../features/product/productSlice'
import styles from './ProductDetail.module.css'

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedProduct: product, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id, dispatch]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}><img src={product?.image} className={styles.productImg} alt="" /></div>
      <div>
        <h3>{product?.name}</h3>
        <h4>₩{product?.price}</h4>
        <button className={styles.btn}>추가</button>
      </div>
    </div>
  )
}

export default ProductDetail
