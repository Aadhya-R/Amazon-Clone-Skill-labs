import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '12px',
        width: '200px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer'
      }}>
        <img src={product.image} alt={product.title} width="100%" height="150px"
          style={{ objectFit: 'cover', borderRadius: '4px' }} />
        <h4 style={{ margin: '8px 0 4px' }}>{product.title}</h4>
        <p style={{ color: '#B12704', fontWeight: 'bold' }}>₹{product.price}</p>
      </div>
    </Link>
  )
}

export default ProductCard