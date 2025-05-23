import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div style={{ border: '1.5px solid black', padding: 10, marginBottom: 10 }}>
      <h3><Link style={{textDecoration:'none', color: '#1a8877'}} to={`/post/${post.id}`}>{post.title}</Link></h3>
      <p>By {post.author}</p>
      <p>{post.content.substring(0, 100)}...</p>
    </div>
  );
}
