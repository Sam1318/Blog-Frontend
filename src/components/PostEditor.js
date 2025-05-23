import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';

export default function PostEditor({ content, setContent }) {
  return (
    <div className="mb-3">
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        config={{
          ckfinder: {
            uploadUrl: '/api/upload', // Your backend upload URL
          },
        }}
      />
    </div>
  );
}

PostEditor.propTypes = {
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};
