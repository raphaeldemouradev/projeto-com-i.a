import { products } from "../../data/products"
import ProductCard from "../../components/ProductCard/ProductCard"
import "./Home.css"

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Design profissional para sua marca</h1>
          <p>Banners, capas, cardápios, cartazes e muito mais</p>
          <a href="#vitrine" className="cta">Ver vitrine</a>
        </div>
      </section>

      <section className="vitrine" id="vitrine">
        <h2>Nossos Designs</h2>

        <div className="grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
