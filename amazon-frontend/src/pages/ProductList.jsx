import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../components/ProductCard';
import API from '../api/axios';

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    API.get('/products')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        } else {
          throw new Error('Empty data');
        }
      })
      .catch(err => {
        console.error('Failed to fetch products, using internal fallback', err);
        setProducts([
          { _id: '1', title: 'iPhone 15 Pro', price: 129900, image: 'https://m.media-amazon.com/images/I/81SigAnN7KL._AC_SL1500_.jpg' },
          { _id: '2', title: 'Sony WH-1000XM5', price: 29990, image: 'https://m.media-amazon.com/images/I/51aBv7SXYfL._AC_SL1200_.jpg' }
        ]);
      })
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