import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <strong>{product.price}</strong>
      
      <Link to={`/produto/${product.id}`}>
        <button className="secundary">Ver mais</button>
      </Link>
    </div>
  )
}

export default ProductCard
