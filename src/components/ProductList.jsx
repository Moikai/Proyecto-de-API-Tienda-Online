import { Link } from 'react-router-dom';

export default function ProductList({ productsToShow }) {
  return (

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
      }}
    >
      {productsToShow.map((product) => (
        <div
          key={product.id}
          style={{ border: '1px solid #ccc', padding: '1rem' }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100px' }}
          />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <Link to={`/product/${product.id}`}> Ver detalle </Link>
        </div>
      ))}
    </div>
  );
}