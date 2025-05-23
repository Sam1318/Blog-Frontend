import { useState } from 'react';
import axios from 'axios';
import PostEditor from '../components/PostEditor';
import { toast } from 'react-toastify';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if(title && content != null){toast.error('please enter detail');}
    axios.post('/api/posts', { title, content }, { withCredentials: true })
      .then(res => toast.success(res.data.message))
      .catch(err => console.error(err)); 
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4" style={{ color: '#1a8877' }}>Create New Post</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control mb-3"
          />

          <PostEditor content={content} setContent={setContent} />

          <button className="btn mt-3 text-bold d-flex justify-content-end" style={{ backgroundColor: '#bff1ea', color: 'black', fontWeight: 'bold' }} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
