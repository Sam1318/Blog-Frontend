import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Delete this post?")) {
      axios.delete(`/api/posts/${post.id}`, { withCredentials: true })
        .then(() => {
          toast.success("Deleted");
          window.location.reload();
        })
        .catch(() => toast.error("Delete failed"));
    }
  };

  return (
    <div className="card h-100 shadow small-card">
      <div className="card-body">
        <h5 className="card-title" style={{color:'red'}}>{post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">By: {post.author}</h6>
        <p className="card-text text-truncate">{post.content}</p>
        <Link to={`/post/${post.id}`} className="btn btn-primary btn-sm me-2 mt-4 d-flex justify-content-end">View</Link>
        <Link to={`/edit/${post.id}`} className="btn btn-warning btn-sm me-2 mt-4 d-flex justify-content-end">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger btn-sm mt-4 d-flex justify-content-end">Delete</button>
      </div>
    </div>
  );
}
