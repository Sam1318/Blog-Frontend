import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostDetail() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the post
    axios.get(`/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => {
        console.error(err);
        alert('Post not found');
        navigate('/myposts');
      });
  }, [id, navigate]);

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    axios.delete(`/api/posts/${id}`, { withCredentials: true })
      .then(() => {
        alert('Post deleted');
        navigate('/myposts');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to delete post');
      });
  };

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  if (!post) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-3">{post.title}</h2>
          <p className="text-muted mb-4"><strong>By:</strong> {post.author}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-4">
            <button onClick={handleEdit} className="btn btn-warning me-2">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
