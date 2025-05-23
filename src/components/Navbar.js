// // import { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import axios from 'axios';

// // export default function Navbar() {
// //   const [user, setUser] = useState(null);

// //   // useEffect(() => {
// //   //   axios.get('/api/user')
// //   //     .then(res => {
// //   //       console.log(res,"rohan")
// //   //       setUser(res.data);
// //   //       alert(res, "coming from navbar");
// //   //     })
// //   //     .catch(() => setUser(null));
// //   // }, []);

// //   useEffect(() => {
// //   axios.get('/api/user')
// //     .then(res => {
// //       // console.log(res.data, "coming from navbar");
// //       setUser(res.data);
// //       console.log("User: " + JSON.stringify(res.data)); // Only for testing
// //     })
// //     .catch(err => {
// //       console.log("Error fetching user:", err);
// //       setUser(null);
// //     });
// // }, [user]);

// //   const handleLogout = () => {
// //     axios.post('/api/logout')
// //       .then(() => {
// //         setUser(null);
// //         window.location.href = '/login';
// //       })
// //       .catch(() => alert('Logout failed'));
// //   };

// //   return (
// //     <nav className="navbar navbar-dark bg-dark px-3">
// //       <Link className="navbar-brand" to="/">My Blog</Link>
// //       <div className="d-flex ms-auto">
// //         <Link className="nav-link text-white" to="/">Home</Link>
// //         {user ? (
// //           <>
// //             <Link className="nav-link text-white" to="/new">New Post</Link>
// //             <Link className="nav-link text-white" to="/myposts">My Posts</Link>
// //             <button className="btn btn-link nav-link text-white" onClick={handleLogout}>Logout</button>
// //           </>
// //         ) : (
// //           <>
// //             <Link className="nav-link text-white" to="/login">Login</Link>
// //             <Link className="nav-link text-white" to="/signup">Sign Up</Link>
// //           </>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }


// import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Navbar() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('/api/user')
//       .then(res => {
//         setUser(res.data);
//       })
//       .catch(() => {
//         setUser(null);
//       });
//   }, []); // Run only once on mount

//   const handleLogout = () => {
//     axios.post('/api/logout')
//       .then(() => {
//         setUser(null);
//         navigate('/login');
//       })
//       .catch(() => alert('Logout failed'));
//   };

//   return (
//     <nav className="navbar navbar-dark bg-dark px-3">
//       <Link className="navbar-brand" to="/">My Blog</Link>
//       <div className="d-flex ms-auto align-items-center">
//         <Link className="nav-link text-white" to="/">Home</Link>
//         {user ? (
//           <>
//             <Link className="nav-link text-white" to="/new">New Post</Link>
//             <Link className="nav-link text-white" to="/myposts">My Posts</Link>
//             <button className="btn btn-link nav-link text-white" onClick={handleLogout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link className="nav-link text-white" to="/login">Login</Link>
//             <Link className="nav-link text-white" to="/signup">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

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
      .catch(() => alert('Logout failed'));
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">My Blog</Link>
      <div className="d-flex ms-auto align-items-center">
        <Link className="nav-link text-white" to="/">Home</Link>
        {user ? (
          <>
            <Link className="nav-link text-white" to="/new">New Post</Link>
            <Link className="nav-link text-white" to="/myposts">My Posts</Link>
            <button className="btn btn-link nav-link text-white" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link text-white" to="/login">Login</Link>
            <Link className="nav-link text-white" to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}