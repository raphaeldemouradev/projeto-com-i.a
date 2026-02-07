import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./Checkout.css"

function Checkout() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [showPopup, setShowPopup] = useState(false)
  
  const { product, customer } = state || {}

  if (!product || !customer) {
    return <p>Dados não encontrados.</p>
  }

  function handleFinish() {
    setShowPopup(true)
  }

  return (
    <div className="checkout-page">

      {/* VOLTAR */}
      <div className="checkout-top">
        <button onClick={() => navigate(-1)}>
          ← Voltar
        </button>
      </div>

      {/* BOX */}
      <div className="checkout-box">
        <h2>Confirmação do pedido</h2>

        <div className="checkout-item">
          <span>Serviço</span>
          <strong>{product.title}</strong>
        </div>

        <div className="checkout-item">
          <span>Tipo</span>
          <strong>Serviço de design</strong>
        </div>

        <div className="checkout-item">
          <span>Preço</span>
          <strong>{product.price}</strong>
        </div>

        <div className="checkout-item">
          <span>Cliente</span>
          <strong>{customer.name}</strong>
        </div>

        <div className="checkout-item">
          <span>Email</span>
          <strong>{customer.email}</strong>
        </div>

        <div className="checkout-description">
          <span>Descrição do pedido</span>
          <p>{customer.details}</p>
        </div>

        <button className="finish-btn" onClick={handleFinish}>
          Finalizar pedido
        </button>
      </div>

      {/* POP-UP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Obrigado pela compra! 🎉</h3>
            <p>Seu pedido foi enviado com sucesso.</p>

            <div className="popup-actions">
              <button onClick={() => navigate("/contato")}>
                Contato
              </button>
              <button onClick={() => navigate("/")}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Checkout
