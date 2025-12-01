'use client';

import React, { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { blogAPI } from '@/lib/api';
import { BlogPost } from '@/types';

export default function AdminEditBlogPage({ params }: { params: { id: string } }) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Fetch all blogs and find the one with matching ID
        const response = await blogAPI.getPosts();
        const foundBlog = response.data.data.find((b: BlogPost) => b._id === params.id);
        if (foundBlog) {
          setBlog(foundBlog);
          setTitle(foundBlog.title);
          setContent(foundBlog.content);
          setTags(foundBlog.tags?.join(', ') || '');
          setPublished(foundBlog.published || false);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await blogAPI.updatePost(params.id, {
        title,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        published,
      });
      alert('Blog post updated successfully!');
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog post');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="terminal-border p-8">Loading blog post...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="terminal-border p-8 text-center">
          <p className="mb-4">Blog post not found</p>
          <Link href="/admin" className="terminal-border px-4 py-2">
            Back to Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl mb-8 neon-text-green flex items-center">
          <BackButton /> edit_blog_post
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
              {saving ? 'Saving...' : 'Save Changes'}
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
