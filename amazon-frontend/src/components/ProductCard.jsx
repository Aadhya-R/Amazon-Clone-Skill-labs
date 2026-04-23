import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Card className="m-2 shadow-sm" style={{ width: '18rem' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: '200px', objectFit: 'cover' }} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
          <Card.Title className="text-truncate">{product.title}</Card.Title>
        </Link>
        <Card.Text className="fw-bold fs-5 text-danger">
          ₹{product.price}
        </Card.Text>
        <Button 
          variant="warning" 
          className="w-100 fw-bold"
          onClick={() => addToCart(product._id)}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;