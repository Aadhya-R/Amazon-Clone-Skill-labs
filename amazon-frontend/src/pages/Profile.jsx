import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!user) return <div className="p-5 text-center">Please login to view profile.</div>;

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2>User Profile</h2>
      <div className="card p-4 mt-3 shadow-sm">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <Button variant="danger" onClick={handleLogout} className="mt-3">
          Sign Out
        </Button>
      </div>
    </Container>
  );
}
