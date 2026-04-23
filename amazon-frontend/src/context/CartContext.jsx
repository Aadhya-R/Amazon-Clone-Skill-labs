import { createContext, useContext, useState } from 'react'
import API from '../api/axios'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (productId, quantity = 1) => {
    API.post('/cart', { productId, quantity })
      .then(res => setCartItems(res.data))
      .catch(err => console.error('Cart error', err))
  }

  const removeFromCart = (productId) => {
    API.delete(`/cart/${productId}`)
      .then(res => setCartItems(res.data))
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