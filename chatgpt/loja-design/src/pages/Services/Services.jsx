import { Link, useNavigate } from "react-router-dom"
import "./Services.css"

const services = [
  {
    id: 1,
    title: "Logotipo",
    description: "Criação de identidade visual profissional",
    price: "R$ 150"
  },
  {
    id: 2,
    title: "Banner",
    description: "Artes para redes sociais e anúncios",
    price: "R$ 80"
  },
  {
    id: 3,
    title: "Cardápio",
    description: "Cardápios digitais e impressos",
    price: "R$ 120"
  },
  {
    id: 4,
    title: "Cartaz",
    description: "Cartazes promocionais",
    price: "R$ 90"
  }
]

function Service() {
  const navigate = useNavigate()

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
        {services.map(service => (
          <div key={service.id} className="service-card">

            <div className="service-img" />

            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <strong className="price">{service.price}</strong>

            <button
              onClick={() =>
                navigate("/pagamento", {
                  state: { product: service }
                })
              }
            >
              Fazer pedido
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Service
