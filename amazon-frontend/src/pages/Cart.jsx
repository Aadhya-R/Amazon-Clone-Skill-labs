import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, removeFromCart } = useCart()

  const total = cartItems.reduce((sum, item) => {
    // item.productId is populated, so we access item.productId.price
    return sum + (item.productId?.price || 0) * item.quantity
  }, 0)

  if (cartItems.length === 0) return <p style={{ padding: '2rem' }}>Your cart is empty.</p>

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item._id} style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          borderBottom: '1px solid #ddd', padding: '12px 0'
        }}>
          <img src={item.productId?.image} alt={item.productId?.title}
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0 }}>{item.productId?.title}</h4>
            <p style={{ color: '#B12704', fontWeight: 'bold', margin: '4px 0' }}>₹{item.productId?.price}</p>
            <p style={{ margin: 0, color: '#555' }}>Qty: {item.quantity}</p>
          </div>
          <button 
            onClick={() => removeFromCart(item.productId?._id)}
            style={{ backgroundColor: 'transparent', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Remove
          </button>
          <p style={{ fontWeight: 'bold' }}>₹{(item.productId?.price || 0) * item.quantity}</p>
        </div>
      ))}
      <h3 style={{ textAlign: 'right', marginTop: '1rem' }}>Total: ₹{total}</h3>
      <button style={{
        float: 'right', backgroundColor: '#FFD814', border: 'none',
        padding: '12px 32px', borderRadius: '8px', fontSize: '1rem',
        cursor: 'pointer', fontWeight: 'bold'
      }}>
        Checkout
      </button>
    </div>
  )
}