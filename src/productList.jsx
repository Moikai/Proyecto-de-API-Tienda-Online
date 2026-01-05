import { useState, useEffect } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]); // 1. Estado para productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);     // Estado de error

  useEffect(() => {
    // 2. Traer datos al montar
    fetch("https://fakestoreapi.com/products") // 3. API
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);  // 4. Guardar datos en estado
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 5. Renderizado
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <img src={product.image} alt={product.title} style={{ width: "100px" }} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
