import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify({ name: res.data.name, id: res.data.userId }));
      navigate('/');
      window.location.reload(); // Refresh to update Navbar/Context
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Sign-In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                 style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                 style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <button type="submit" style={{ backgroundColor: '#FFD814', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
          Continue
        </button>
      </form>
    </div>
  );
}