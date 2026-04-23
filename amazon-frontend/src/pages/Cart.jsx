import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart()

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.productId?.price || 0) * item.quantity
  }, 0)

  if (cartItems.length === 0) return (
    <div className="p-5 text-center shadow-sm rounded border">
      Your cart is empty. <Link to="/">Go Shopping</Link>
    </div>
  )

  return (
    <div className="mt-3">
      <h2>Shopping Cart</h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            {cartItems.map(item => (
              <ListGroup.Item key={item._id} className="p-3 shadow-sm mb-2 rounded">
                <Row className="align-items-center">
                  <Col md={2}>
                    <img src={item.productId?.image} alt={item.productId?.title} className="img-fluid rounded" style={{ height: '80px', objectFit: 'cover' }} />
                  </Col>
                  <Col md={5}>
                    <Link to={`/product/${item.productId?._id}`} className="text-decoration-none text-dark fw-bold">
                      {item.productId?.title}
                    </Link>
                  </Col>
                  <Col md={2}>
                    <span>Qty: {item.quantity}</span>
                  </Col>
                  <Col md={2}>
                    <strong>₹{item.productId?.price}</strong>
                  </Col>
                  <Col md={1}>
                    <Button variant="light" onClick={() => removeFromCart(item.productId?._id)}>
                      <i className="fas fa-trash text-danger"></i> Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items): ₹{total}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button variant="warning" className="fw-bold">
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}