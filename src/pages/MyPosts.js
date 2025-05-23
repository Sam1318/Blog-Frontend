import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';

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
      .catch(err => alert('Please log in first'));
  }, []);

  const handleDetails = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">My Posts</h2>
          {posts.length ? (
            posts.map(post => (
              <div key={post.id} className="mb-3">
                <PostCard post={post} />
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => handleDetails(post.id)}>
                  Details
                </button>
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
