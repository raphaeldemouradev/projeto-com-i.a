import { useParams, useNavigate } from "react-router-dom"
import { products } from "../../data/products"
import "./Services.css"

function Services() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id))

  if (!product) return <p>Serviço não encontrado</p>

  return (
    <div className="services">
      <h2>Confirmação do Serviço</h2>

      <div className="box">
        <h3>{product.title}</h3>
        <p>Categoria: {product.category}</p>
        <strong>{product.price}</strong>

        <select>
          <option>Design padrão</option>
          <option>Design premium (+ revisão)</option>
          <option>Design urgente</option>
        </select>

        <div className="buttons">
          <button onClick={() => navigate(-1)}>Voltar</button>

          <button className="primary">
            Ir para pagamento
          </button>
        </div>
      </div>
    </div>
  )
}

export default Services
