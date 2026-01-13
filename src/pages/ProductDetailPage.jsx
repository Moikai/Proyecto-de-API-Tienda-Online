import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from './ProductDetailPage.module.css';


function ProductDetailPage() {
    const { id } = useParams(); // 1. leer ID de la URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar el producto");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.page}>
            {!loading && !error && product && (
                <div className={styles.grid}>
                    <div className={styles.imageWrapper}>
                        <img
                          src={product.image}
                          alt={product.title || 'Imagen del producto'}
                          className={styles.image}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/320x320?text=Imagen+no+disponible'; e.currentTarget.alt = 'Imagen no disponible'; }}
                          aria-describedby="product-desc"
                        />
                    </div>

                    <div className={styles.info}>
                        <h1 className={styles.title}>{product.title}</h1>
                        <p className={styles.price}>${product.price}</p>
                        <p id="product-desc" className={styles.description}>{product.description || 'Sin descripción disponible'}</p>

                        <div className={styles.actions}>
                            <button className={styles.btnSecondary} onClick={() => navigate(-1)} aria-label="Volver a la lista de productos">Volver</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetailPage;