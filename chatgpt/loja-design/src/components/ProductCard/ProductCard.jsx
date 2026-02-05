import { Link } from "react-router-dom"
import "./ProductCard.css"

function ProductCard({ product, index }) {
  return (
    <div className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="image-placeholder">
        {/* imagem futura */}
      </div>

      <div className="info">
        <h3>{product.title}</h3>
        <p>{product.category}</p>

        <Link to={`/produto/${product.id}`}>
          <button>Ver mais</button>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
