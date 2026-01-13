import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import styles from './ProductPage.module.css';

export default function ProductPage() {
  const [products, setProducts] = useState([]); // 1. Estado para productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // 2. Traer datos al montar
    fetch('https://fakestoreapi.com/products') // 3. API
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
      })
      .then((data) => {
        setProducts(data); // 4. Guardar datos en estado
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // 5. Renderizado
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Productos</h1>
        <div className={styles.controls}>
          <input
            className={styles.input}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
          />

          <select
            className={styles.select}
            onChange={e => setSelectedCategory(e.target.value)}
            aria-label="Filtro por categoría"
            value={selectedCategory}
          >
            <option value="">Todas</option>
            <option value="electronics">Electrónica</option>
            <option value="jewelery">Joyas</option>
            <option value="men's clothing">Ropa de Hombres</option>
            <option value="women's clothing">Ropa de Mujeres</option>
          </select>

          <span className={styles.count} role="status" aria-live="polite">{filteredProducts.length} resultados</span>
        </div>
      </div>

      <ProductList productsToShow={filteredProducts} />
    </div>

  )



}