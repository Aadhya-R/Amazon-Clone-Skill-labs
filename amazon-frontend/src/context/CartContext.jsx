import { createContext, useContext, useState, useEffect } from 'react'
import API from '../api/axios'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const token = localStorage.getItem('token')

  // Load cart on startup if logged in
  useEffect(() => {
    if (token) {
      API.get('/cart', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setCartItems(res.data.items || []))
        .catch(err => console.error('Failed to load cart', err))
    }
  }, [token])

  const addToCart = (productId, quantity = 1) => {
    if (!token) return alert('Please login first!')
    API.post('/cart/add', { productId, quantity }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCartItems(res.data.items))
      .catch(err => console.error('Cart error', err))
  }

  const removeFromCart = (productId) => {
    API.delete(`/cart/remove/${productId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCartItems(res.data.items))
      .catch(err => console.error('Remove error', err))
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}