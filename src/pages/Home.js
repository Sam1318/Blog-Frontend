import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => {
        setPosts(res.data);
        setFilteredPosts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(lowerSearch) ||
      post.content.toLowerCase().includes(lowerSearch)
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  const handleDetailsClick = async (id) => {
    try {
      const res = await axios.get('/api/user');
      if (res.data) {
        // navigate('/posts/${postId}');
        console.log(res);
        // alert(id);
        navigate(`/posts/${id}`);
      } else {
        toast.error('You must be logged in to view details.');
        navigate('/login');
      }
    } catch (err) {
      toast.error('You must be logged in to view details.');
      navigate('/login');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: '#1a8877' }}>All Posts</h2>

      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6 col-sm-8">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Search posts here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Posts */}
      <div className="row">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div className="col-md-6 mb-4" key={post.id}>
              <PostCard post={post} />
              <div className="text-end mt-2 d-flex justify-content-end">
                <button
                  className="btn "
                  style={{ backgroundColor: '#bff1ea', color: 'black', fontWeight: 'bold' }}
                  onClick={() => handleDetailsClick(post.id)}>
                  Get Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No posts found.</div>
        )}
      </div>
    </div>
  );
}