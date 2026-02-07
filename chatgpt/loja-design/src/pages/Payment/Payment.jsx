import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { products } from "../../data/products"
import "./Payment.css"

function Payment() {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = products.find(
    item => item.id === Number(id)
  )

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")

  if (!product) {
    return <p>Pagamento inválido</p>
  }

  function handleContinue(e) {
    e.preventDefault()

    navigate("/checkout", {
      state: {
        product,
        customer: {
          name,
          email,
          details
        }
      }
    })
  }

  return (
    <div className="payment-page">

      {/* VOLTAR */}
      <div className="payment-top">
        <Link to="/services">← Voltar para serviços</Link>
      </div>

      {/* BOX */}
      <div className="payment-box">
        <h2>{product.title}</h2>
        <span className="service-type">Serviço de design</span>

        <strong className="price">{product.price}</strong>

        <label>
          Nome e sobrenome
          <input
            type="text"
            placeholder="Ex: Seu Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          Informe seu Email
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label>
          Descreva como você quer
          <textarea
            placeholder="Explique sua ideia, cores, referências..."
            value={details}
            onChange={e => setDetails(e.target.value)}
          />
        </label>

        <button onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  )
}

export default Payment
