import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

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
    <div>
      <h1>Productos</h1>
      <div></div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <select onChange={e => setSelectedCategory(e.target.value)}>
        <option value="">Todas</option>
        <option value="electronics">Electrónica</option>
        <option value="jewelery">Joyas</option>
        <option value="men's clothing">Ropa de Hombres</option>
        <option value="women's clothing">Ropa deMujeres</option>
      </select>
      <ProductList productsToShow={filteredProducts} />
    </div>

  )



}