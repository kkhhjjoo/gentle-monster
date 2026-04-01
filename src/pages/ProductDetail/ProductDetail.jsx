import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styles from './ProductDetail.module.css'

const ProductDetail = () => {

  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const getProductDetail = async () => { 
    let url = `https://my-json-server.typicode.com/kkhhjjoo/gentle-monster/products/${id}`;
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setProduct(data);

  }

  useEffect(() => { 
    getProductDetail()
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}><img src={product?.img} className={styles.productImg} alt="" /></div>
      <div>
        <h3>{product?.title}</h3>
        <h4>₩{product?.price}</h4>
        <button className={styles.btn}>추가</button>
      </div>
    </div>
  )
}

export default ProductDetail
