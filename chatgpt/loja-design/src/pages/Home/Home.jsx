import { Link } from "react-router-dom"
import { products } from "../../data/products"
import ProductCard from "../../components/ProductCard/ProductCard"
import "./Home.css"

function Home() {
  function scrollToProducts() {
    document
      .getElementById("vitrine")
      .scrollIntoView({ behavior: "smooth"})
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero"> 
        <h1>Design profissional <br /> para sua marca</h1>

        <p>Banners, capas, cardápios, cartazes e muito mais</p>

        <button className="hero-btn" onClick={scrollToProducts}>
          Ver vitrine ↓
        </button>
      </section>

      {/* VITRINE */}
      <section className="vitrine" id="vitrine">
        <h2>Nossos Designs</h2>

        <div className="grid">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </section>

      {/* BOTÃO VOLTAR AO TOPO */}
      <button className="back-top" onClick={scrollToTop}>
        ↑
      </button>

      <div className="services-cta">
        <Link to="/services" className="services-link">
          Ver todos os serviços
        </Link>
      </div>

    </div>
  )
}

export default Home
