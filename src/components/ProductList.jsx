import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';

export default function ProductList({ productsToShow }) {
  return (
    <div className={styles.container}>
      {productsToShow.map((product) => (
        <div key={product.id} className={styles.card}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p className={styles.price}> ${product.price}</p>
          <Link to={`/product/${product.id}`}> Ver detalle </Link>
        </div>
      ))}
    </div>
  );
}