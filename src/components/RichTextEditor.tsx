
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import { lowlight } from 'lowlight/lib/common';

interface RichTextEditorProps {
	value: any;
	onChange: (content: any) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
		const editor = useEditor({
			extensions: [
				StarterKit,
				CodeBlockLowlight.configure({ lowlight }),
				Image,
			],
			content: value,
			onUpdate: ({ editor }) => {
				onChange(editor.getJSON());
			},
			editorProps: {
				attributes: {
					class: 'prose min-h-[300px] p-4 bg-terminal-bg text-terminal-text rounded border border-terminal-border focus:outline-none',
				},
			},
			immediatelyRender: false,
		});

	return (
		<div>
			<div className="flex gap-2 mb-2 flex-wrap">
				<button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className="terminal-border px-2 py-1">Bold</button>
				<button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className="terminal-border px-2 py-1">Italic</button>
				<button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className="terminal-border px-2 py-1">H1</button>
				<button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="terminal-border px-2 py-1">H2</button>
				<button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="terminal-border px-2 py-1">Bullet List</button>
				<button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="terminal-border px-2 py-1">Ordered List</button>
				<button type="button" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className="terminal-border px-2 py-1">Code Block</button>
				<button type="button" onClick={() => {
					const url = window.prompt('Image URL');
					if (url) editor?.chain().focus().setImage({ src: url }).run();
				}} className="terminal-border px-2 py-1">Image</button>
			</div>
			<EditorContent editor={editor} />
		</div>
	);
};

export default RichTextEditor;
