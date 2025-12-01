'use client';

import React, { useState } from 'react';
import BlogEditorComponent from '@/components/BlogEditor';

export default function CreateBlogPage() {
  // Placeholder for admin blog creation UI
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl mb-8 neon-text-green">
          <span className="glowing-text">{'>'}</span> create_blog
        </h1>
        <BlogEditorComponent />
      </div>
    </div>
  );
}
