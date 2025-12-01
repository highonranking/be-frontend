'use client';

import React, { useState } from 'react';
import BackButton from '@/components/BackButton';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { blogAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AdminNewBlogPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      await blogAPI.createPost({
        title,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        published,
      });
      alert('Blog post created successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog post');
    } finally {
      setSaving(false);
    }
  };

  if (!isLoggedIn || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="terminal-border p-8 text-center">
          <p className="mb-4">Admin access required</p>
          <Link href="/auth/login" className="terminal-border px-4 py-2">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl mb-8 neon-text-green flex items-center">
          <BackButton /> create_blog_post
        </h1>
        
        <div className="terminal-border p-6 space-y-6">
          <div>
            <label className="block mb-2 text-neon-cyan">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-terminal-bg border border-neon-green p-3 text-terminal-text"
              placeholder="Blog post title"
            />
          </div>

          <div>
            <label className="block mb-2 text-neon-cyan">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-terminal-bg border border-neon-green p-3 text-terminal-text min-h-96"
              placeholder="Write your blog content here..."
            />
          </div>

          <div>
            <label className="block mb-2 text-neon-cyan">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-terminal-bg border border-neon-green p-3 text-terminal-text"
              placeholder="react, javascript, tutorial"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="published" className="text-neon-cyan">Publish this post</label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-neon-green text-terminal-bg px-6 py-2 disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create Post'}
            </button>
            <Link
              href="/admin"
              className="border border-neon-cyan px-6 py-2 inline-block"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
