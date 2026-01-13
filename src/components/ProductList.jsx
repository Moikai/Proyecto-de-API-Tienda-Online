import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';

export default function ProductList({ productsToShow }) {
  return (
    <div className={styles.container}>
      {productsToShow.map((product) => (
        <div key={product.id} className={styles.card}>
          <img
            src={product.image}
            alt={product.title || 'Imagen del producto'}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/320x240?text=No+image'; e.currentTarget.alt = 'Imagen no disponible'; }}
          />
          <h3>{product.title}</h3>
          <p className={styles.price}> ${product.price}</p>
          <Link to={`/product/${product.id}`} aria-label={`Ver detalle de ${product.title}`}> Ver detalle </Link>
        </div>
      ))}
    </div>
  );
}