import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#131921',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', fontSize: '22px', textDecoration: 'none', fontWeight: 'bold' }}>
        🛒 Amazon Clone
      </Link>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/cart"  style={{ color: 'white', textDecoration: 'none' }}>Cart</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  )
}

export default Navbar