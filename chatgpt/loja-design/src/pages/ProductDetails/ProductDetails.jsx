import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import "./ProductDetails.css";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find(p => p.id === Number(id))

    if (!product) return <p>Produto não encontrado</p>

    return (
        <div className="details">
            <img src={product.image} alt={product.title} />

            <div className="info">
                <h2>{product.title}</h2>
                <p>{product.description || "Descrição detalhada do design."}</p>
                <strong>{product.price}</strong>

                <div className="buttons">
                    <button onClick={() => navigate(-1)}>Voltar</button>

                    <button
                        className="primary"
                        onClick={() => navigate(`/servicos/${product.id}`)}
                    >
                        Escolher serviço
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails