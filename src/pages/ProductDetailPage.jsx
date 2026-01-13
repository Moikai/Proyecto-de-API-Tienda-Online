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
                        <img src={product.image} alt={product.title} className={styles.image} />
                    </div>

                    <div className={styles.info}>
                        <h1 className={styles.title}>{product.title}</h1>
                        <p className={styles.price}>${product.price}</p>
                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.actions}>
                            <button className={styles.btn}>Comprar</button>
                            <button className={styles.btnSecondary} onClick={() => navigate(-1)}>Volver</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetailPage;