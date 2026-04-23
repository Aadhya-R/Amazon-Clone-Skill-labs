import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container className="small-container py-5" style={{ maxWidth: '400px' }}>
      <h2 className="my-3 text-center">Create Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="At least 6 characters"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button variant="warning" type="submit" className="w-100 fw-bold">
            Continue
          </Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <a href="/login">Sign-In</a>
        </div>
      </Form>
    </Container>
  );
}
