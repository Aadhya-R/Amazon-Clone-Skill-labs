import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import API from '../api/axios'

const dummyProducts = [
  { _id: '1', title: 'iPhone 15',    price: 79999, image: 'https://via.placeholder.com/200' },
  { _id: '2', title: 'Samsung TV',   price: 45000, image: 'https://via.placeholder.com/200' },
  { _id: '3', title: 'Nike Shoes',   price: 4999,  image: 'https://via.placeholder.com/200' },
  { _id: '4', title: 'Laptop',       price: 65000, image: 'https://via.placeholder.com/200' },
  { _id: '5', title: 'Headphones',   price: 2999,  image: 'https://via.placeholder.com/200' },
]

function ProductList() {
  const [products, setProducts] = useState(dummyProducts) // swap with [] when API ready
  const [loading, setLoading]   = useState(false)

  // Uncomment this block when Laptop 4 backend is ready:
  /*
  useEffect(() => {
    setLoading(true)
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])
  */

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

export default ProductList