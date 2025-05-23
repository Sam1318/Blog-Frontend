import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/posts/${id}`, { withCredentials: true })
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load post');
        navigate('/myposts');
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`/api/posts/${id}`, { title, content }, { withCredentials: true })
      .then(() => {
        alert('Post updated');
        navigate(`/posts/${id}`);
      })
      .catch(() => alert('Failed to update post'));
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Edit Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                id="content"
                className="form-control"
                rows="6"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Update Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}
