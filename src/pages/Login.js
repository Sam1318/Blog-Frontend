import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Trying to log in with:', email, password);
    axios.post('/api/login', { email, password }, { withCredentials: true })
      .then(res => {
        console.log(res.data.message);
        toast.success('Login successful!');
        navigate('/');        
      })
      .catch(err => {
        console.log('Login failed');
        toast.error('Login failed!');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email" 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter your password" 
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>
              <button onClick={handleLogin} className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
