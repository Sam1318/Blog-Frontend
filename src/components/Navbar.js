import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('/api/user')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, [location.pathname]); // Re-check user on page change

  const handleLogout = () => {
    axios.post('/api/logout')
      .then(() => {
        setUser(null);
        navigate('/login');
      })
      .catch(() => toast.error('Logout failed'));
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand " style={{ color: 'somecolor' }} to="/"> My Blog </Link>
      <div className="d-flex ms-auto align-items-center">
        <Link className="nav-link text-white mx-2 custom-hover" style={{ fontWeight: 'bold' }} to="/"> Home </Link>
        {user ? (
          <>
            <Link className="nav-link text-white mx-2 custom-hover" style={{ fontWeight: 'bold' }} to="/new"> New Post </Link>
            <Link className="nav-link text-white mx-2 custom-hover" style={{ fontWeight: 'bold' }} to="/myposts"> My Posts </Link>
            <button className="btn btn-link nav-link text-white mx-2 custom-hover" style={{ fontWeight: 'bold' }} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link text-white mx-2 custom-hover" style={{ fontWeight: 'bold' }} to="/login">Login</Link>
            <Link className="nav-link text-white mx-2 custom-hover" style={{ fontWeight: 'bold' }} to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}