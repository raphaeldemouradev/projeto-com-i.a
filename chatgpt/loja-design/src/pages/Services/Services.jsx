import { Link, useNavigate } from "react-router-dom"
import "./Services.css"
import { products } from "../../data/products"

function Services() {
  const navigate = useNavigate()

  function handleOrder(productId) {
    navigate(`/payment/${productId}`)
  }

  return (
    <div className="service-page">

      {/* VOLTAR */}
      <div className="service-top">
        <Link to="/" className="back-link">
          ← Voltar para vitrine
        </Link>
      </div>

      {/* HERO SERVICE */}
      <section className="service-hero">
        <h1>Nossos serviços</h1>
        <p>Escolha o serviço ideal para o seu projeto</p>
      </section>

      {/* LISTA */}
      <section className="service-list">
        {products.map(product => (
          <div key={product.id} className="service-card">

            <div className="service-img" />

            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <strong className="price">{product.price}</strong>

            <button
              onClick={() => handleOrder(product.id)}>
              Fazer pedido
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Services
