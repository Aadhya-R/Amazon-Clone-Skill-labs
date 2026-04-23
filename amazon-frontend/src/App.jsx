import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import { useCart } from './context/CartContext'


export default function App() {
  const { cartItems } = useCart()
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/">Amazon Clone</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Nav.Link as={Link} to="/cart">
                    Cart
                    {cartItems.length > 0 && (
                      <Badge pill bg="danger" className="ms-1">
                        {cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                  {user ? (
                    <Nav.Link as={Link} to="/profile">{user.name}</Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/login">Sign In</Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Container>
        </main>
        <footer className="text-center p-3 border-top mt-auto">
          All rights reserved
        </footer>
      </div>
    </BrowserRouter>
  )
}
