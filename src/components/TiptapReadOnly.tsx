import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import { lowlight } from 'lowlight/lib/common';

interface TiptapReadOnlyProps {
  content: any;
}

const TiptapReadOnly: React.FC<TiptapReadOnlyProps> = ({ content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({ lowlight }),
      Image,
    ],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[300px] p-0',
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
};

export default TiptapReadOnly;