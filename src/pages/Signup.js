import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    axios.post('/api/register', { username, email, password })
      .then(res => {
        console.log(res.data);
        toast.success(res.data.message);
        navigate('/login');
      })
      .catch(() => toast.error('Signup failed'));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center" style={{ color: '#1a8877', fontWeight: 'bold' }} >Signup</h2>

          <input
            type="text"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            className="form-control mb-4"
          />

          <button
            onClick={handleSignup}
            className="btn d-block mx-auto w-50 hover"
                style={{ backgroundColor: '#bff1ea', color: 'black', fontWeight: 'bold' }}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
