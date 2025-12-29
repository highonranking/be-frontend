'use client';

import React, { useState, useEffect } from 'react';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { blogAPI, externalContentAPI } from '@/lib/api';
import { BlogPost } from '@/types';

export default function AdminPage() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [syncLoading, setSyncLoading] = useState<string | null>(null);

  const handleSync = async (type: 'medium' | 'github' | 'linkedin') => {
    setSyncLoading(type);
    setSyncStatus(null);
    try {
      await externalContentAPI.syncContent(type);
      setSyncStatus(`${type === 'medium' ? 'Medium Blogs' : 'GitHub Repos'} synced successfully!`);
    } catch (error) {
      setSyncStatus(`Failed to sync ${type === 'medium' ? 'Medium Blogs' : 'GitHub Repos'}.`);
    } finally {
      setSyncLoading(null);
    }
  };

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'admin') {
      // Redirect to login or home
      return;
    }

    const fetchBlogs = async () => {
      try {
        const response = await blogAPI.getPosts();
        setBlogs(response.data.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [isLoggedIn, user]);

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
    <div className="min-h-screen bg-terminal-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8 neon-text-green flex items-center">
          <BackButton />
          admin_panel
        </h1>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {['dashboard', 'blogs', 'profile', 'content', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 terminal-border text-sm ${
                activeTab === tab ? 'bg-neon-green text-terminal-bg' : ''
              }`}
            >
              ${tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="terminal-border p-6">
              <div className="text-neon-purple text-sm mb-2">Total Blogs</div>
              <div className="text-3xl font-bold">{blogs.length}</div>
            </div>
            <div className="terminal-border p-6">
              <div className="text-neon-cyan text-sm mb-2">Published</div>
              <div className="text-3xl font-bold">{blogs.filter((b) => b.published).length}</div>
            </div>
            <div className="terminal-border p-6">
              <div className="text-neon-green text-sm mb-2">Total Views</div>
              <div className="text-3xl font-bold">{blogs.reduce((sum, b) => sum + b.views, 0)}</div>
            </div>
            <div className="terminal-border p-6">
              <div className="text-neon-pink text-sm mb-2">Total Likes</div>
              <div className="text-3xl font-bold">{blogs.reduce((sum, b) => sum + b.likes, 0)}</div>
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && (
          <div>
            <div className="mb-6">
              <Link href="/admin/blog/new" className="bg-neon-green text-terminal-bg px-6 py-2">
                Create New Blog Post
              </Link>
            </div>
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="terminal-border p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold neon-text-cyan">{blog.title}</h3>
                    <p className="text-sm opacity-50">
                      Status: {blog.published ? 'Published' : 'Draft'} • Views: {blog.views}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/blog/edit/${blog._id}`} className="px-3 py-1 border border-neon-green text-sm">
                      Edit
                    </Link>
                    <button className="px-3 py-1 border border-neon-pink text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="terminal-border p-8">
            <h2 className="text-2xl mb-6 neon-text-cyan">Edit Profile</h2>
            <form className="space-y-6">
              <div>
                <label className="block mb-2">Title</label>
                <input type="text" placeholder="Full Stack Developer" className="w-full" />
              </div>
              <div>
                <label className="block mb-2">Bio</label>
                <textarea placeholder="Your bio..." rows={4} className="w-full"></textarea>
              </div>
              <div>
                <label className="block mb-2">Resume URL</label>
                <input type="url" placeholder="https://..." className="w-full" />
              </div>
              <button type="submit" className="bg-neon-green text-terminal-bg px-6 py-2">
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Content Sync Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="terminal-border p-6">
              <h3 className="text-lg mb-4 neon-text-purple">Sync External Content</h3>
              <button
                className="bg-neon-green text-terminal-bg px-6 py-2 mr-4"
                onClick={() => handleSync('medium')}
                disabled={syncLoading === 'medium'}
              >
                {syncLoading === 'medium' ? 'Syncing...' : 'Sync Medium Blogs'}
              </button>
              <button
                className="bg-neon-cyan text-terminal-bg px-6 py-2 mr-4"
                onClick={() => handleSync('github')}
                disabled={syncLoading === 'github'}
              >
                {syncLoading === 'github' ? 'Syncing...' : 'Sync GitHub Repos'}
              </button>
              <button
                className="bg-neon-purple text-terminal-bg px-6 py-2"
                onClick={() => handleSync('linkedin')}
                disabled={syncLoading === 'linkedin'}
              >
                {syncLoading === 'linkedin' ? 'Syncing...' : 'Sync LinkedIn Posts'}
              </button>
              {syncStatus && <div className="mt-4 text-sm text-neon-green">{syncStatus}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
