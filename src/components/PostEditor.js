import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function PostEditor({ content, setContent }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={(e, editor) => setContent(editor.getData())}
    />
  );
}
