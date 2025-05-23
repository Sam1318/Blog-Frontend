import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Delete this post?")) {
      axios.delete(`/api/posts/${post.id}`, { withCredentials: true })
        .then(() => {
          alert("Deleted");
          window.location.reload();
        })
        .catch(() => alert("Delete failed"));
    }
  };

  return (
    <div className="card h-100 shadow">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">By: {post.author}</h6>
        <p className="card-text text-truncate">{post.content}</p>
        <Link to={`/post/${post.id}`} className="btn btn-primary btn-sm me-2">View</Link>
        <Link to={`/edit/${post.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  );
}
