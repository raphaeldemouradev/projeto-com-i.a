import { useContext, useState } from "react"
import { OrderContext } from "../../context/OrderContext"
import { useNavigate } from "react-router-dom"
import "./Checkout.css"

function Checkout() {
  const { order } = useContext(OrderContext)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  if (!order) return <p>Pedido não encontrado</p>

  return (
    <div className="checkout-page">
      <div className="checkout">
        <h2>Finalizar compra</h2>

        <div className="box">
          <h3>Produto</h3>
          <p>{order.product.title}</p>
          <strong>{order.product.price}</strong>
        </div>

        <div className="box">
          <h3>Seus dados</h3>
          <p><strong>Nome:</strong> {order.user.name}</p>
          <p><strong>Email:</strong> {order.user.email}</p>
          <p><strong>WhatsApp:</strong> {order.user.whatsapp}</p>
          {order.user.idea && (
            <p><strong>Descrição:</strong> {order.user.idea}</p>
          )}
        </div>

        <button onClick={() => setOpen(true)}>
          Confirmar compra
        </button>
      </div>

      {open && (
        <div className="modal">
          <div className="modal-content">
            <h3>🎉 Obrigado pela compra!</h3>
            <p>
              Seu pedido foi recebido com sucesso.
              Em breve entraremos em contato.
            </p>

            <button onClick={() => navigate("/contato")}>
              Ir para contato
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
