import { useState } from 'react';
import axios from 'axios';
import PostEditor from '../components/PostEditor';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    axios.post('/api/posts', { title, content }, { withCredentials: true })
      .then(res => alert(res.data.message))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Create New Post</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control mb-3"
          />

          <PostEditor content={content} setContent={setContent} />

          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
