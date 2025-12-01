'use client';

import React from 'react';
import BackButton from '@/components/BackButton';
import BlogEditorComponent from '@/components/BlogEditor';

export default function CreateBlogPage() {
  // Placeholder for admin blog creation UI
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl mb-8 neon-text-green flex items-center">
          <BackButton /> create_blog
        </h1>
        <BlogEditorComponent />
      </div>
    </div>
  );
}
