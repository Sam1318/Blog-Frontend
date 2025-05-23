import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div style={{ border: '1px solid gray', padding: 10, marginBottom: 10 }}>
      <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
      <p>By {post.author}</p>
      <p>{post.content.substring(0, 100)}...</p>
    </div>
  );
}
