import { useParams, useNavigate } from "react-router-dom"
import { products } from "../../data/products"
import "./ProductDetails.css"

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id))

  return (
    <div className="product-details">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Voltar para vitrine
      </button>

      <h2 className="title">{product.title}</h2>

      <section className="mockups">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="mockup">
            <div className="mockup-img" />
            <div className="mockup-info">
              <span>Visual {i + 0}</span>
            </div>
          </div>
        ))}
      </section>

      <p className="description">
        Este produto inclui a criação de um design personalizado,
        desenvolvido conforme as informações fornecidas pelo cliente.
      </p>

      <button 
        className="order-btn"
        onClick={() => navigate(`/servicos/${product.id}`)}
      >
        Fazer um pedido
      </button>
    </div>
  )
}

export default ProductDetails
