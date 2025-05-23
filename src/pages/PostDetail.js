import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        toast.error('Post not found');
        navigate('/myposts');
      });
  }, [id, navigate]);

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    axios.delete(`/api/posts/${id}`, { withCredentials: true })
      .then(() => {
        toast.success('Post deleted');
        navigate('/myposts');
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to delete post');
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
          <h2 className="card-title mb-3" style={{color: '#1a8877'}}>{post.title}</h2>
          <p className="text-muted mb-4"><strong>Author Id : </strong> {post.author_id}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-4 d-flex justify-content-end">
            <button style={{ backgroundColor: '#bff1ea', color: 'black', fontWeight: 'bold' }} onClick={handleEdit} className="btn me-2">
              Edit
            </button>
            <button style={{ backgroundColor: '#bff1ea', color: 'black', fontWeight: 'bold' }} onClick={handleDelete} className="btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
