import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import '../App.css';
import { toast } from 'react-toastify';

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/user', { withCredentials: true })
      .then(userRes => {
        axios.get('/api/posts', { withCredentials: true })
          .then(postRes => {
            const userPosts = postRes.data.filter(p => p.author === userRes.data.username);
            setPosts(userPosts);
            console.log(userPosts, "coming from my post");
          });
      })
      .catch(err => toast.error('Please log in first'));
  }, []);

  const handleDetails = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4" style={{ color: "#1a8877" }}>My Posts</h2>
          {posts.length ? (
            posts.map(post => (
              <div key={post.id} className="mb-3">
                <PostCard post={post} />
                <div className='text-end mt-2 d-flex justify-content-end'> 
                <button
                  className="btn mt-2 d-flex justify-content-end"
                  style={{ backgroundColor: '#bff1ea', color: 'black', fontWeight: 'bold' }}
                  onClick={() => handleDetails(post.id)}>
                  Details
                </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
