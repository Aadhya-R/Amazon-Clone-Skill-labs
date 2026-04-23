import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useCart } from '../context/CartContext'
export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  // Fetch product on load
  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load product', err);
        setLoading(false);
      });
  }, [id]);

  // Add to cart


// inside your component, replace the old handleAddToCart:
const { addToCart } = useCart()

const handleAddToCart = () => {
  addToCart(id)
  setAdded(true)
}

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <img src={product.image} alt={product.title} style={{ width: '100%', borderRadius: '8px' }} />
      <h1>{product.title}</h1>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${product.price}</p>
      <p>{product.description}</p>
      <button
        onClick={handleAddToCart}
        style={{
          backgroundColor: '#FFD814',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        {added ? 'Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  );
}