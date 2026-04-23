import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../components/ProductCard';
import API from '../api/axios';

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-5 text-center">Loading products...</div>

  return (
    <div>
      <h2 className="mb-4">Featured Products</h2>
      <Row>
        {products.map(p => (
          <Col key={p._id} sm={6} md={4} lg={3}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductList;