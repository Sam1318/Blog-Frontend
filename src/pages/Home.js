import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

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

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Posts</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Posts */}
      <div className="row">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div className="col-md-6 mb-4" key={post.id}>
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <div className="text-center">No posts found.</div>
        )}
      </div>
    </div>
  );
}

{/* <h1>hello</h1> */}