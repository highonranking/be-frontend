'use client';

import React, { useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import type { RenderElementProps, RenderLeafProps } from 'slate-react';

const BlogEditorComponent = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<any>([
    {
      type: 'paragraph',
      children: [{ text: 'Start typing your blog post here...' }],
    },
  ]);

  // Type guards for Slate element/leaf
  const renderElement = (props: RenderElementProps) => {
    const el = props.element as any;
    switch (el.type) {
      case 'heading':
        return <h2 {...props.attributes} className="text-2xl font-bold my-4">{props.children}</h2>;
      case 'code':
        return (
          <pre className="bg-black p-4 rounded mb-4 overflow-x-auto">
            <code {...props.attributes} className="text-neon-green">{props.children}</code>
          </pre>
        );
      default:
        return <p {...props.attributes} className="mb-2">{props.children}</p>;
    }
  };

  const renderLeaf = (props: RenderLeafProps) => {
    const leaf = props.leaf as any;
    let el = <span {...props.attributes}>{props.children}</span>;
    if (leaf.bold) el = <strong>{el}</strong>;
    if (leaf.italic) el = <em>{el}</em>;
    if (leaf.code) el = <code className="bg-gray-800 px-1">{el}</code>;
    return el;
  };

  return (
    <div className="terminal-border p-6">
      <h2 className="text-2xl mb-6 neon-text-cyan">Blog Editor</h2>
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write your awesome blog post..."
          className="min-h-96 p-4 border border-neon-green text-terminal-text focus:outline-none"
        />
      </Slate>
    </div>
  );
};

export default BlogEditorComponent;
