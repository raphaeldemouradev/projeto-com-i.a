import { useLocation, useNavigate } from "react-router-dom"
import "./Payment.css"

function Payment() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const product = state?.product

  if (!product) {
    return <p>Pagamento inválido</p>
  }

  return (
    <div className="payment-page">
      <h2>Pagamento</h2>

      <div className="payment-box">
        <p><strong>Serviço:</strong> {product.title}</p>
        <p><strong>Valor:</strong> {product.price}</p>

        <button onClick={() => navigate("/checkout")}>
          Ir para checkout
        </button>
      </div>
    </div>
  )
}

export default Payment
