import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


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

    return (
        <div>
            {loading && <p>Cargando producto...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && product && (
                <>
                    <h1>{product.title}</h1>
                    <img src={product.image} width={200} />
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </>
            )}
            {/* El botón SIEMPRE se renderiza */}
            <button onClick={() => navigate(-1)}>Volver</button>
        </div>
    );
}

export default ProductDetailPage;