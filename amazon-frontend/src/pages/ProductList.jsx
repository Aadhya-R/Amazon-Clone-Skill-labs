import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import API from '../api/axios'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ padding: '20px' }}>Loading products...</p>

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  )
}

export default ProductList;