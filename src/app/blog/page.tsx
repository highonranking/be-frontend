'use client';

import React, { useState, useEffect } from 'react';
import { blogAPI, externalContentAPI } from '@/lib/api';
import { BlogPost } from '@/types';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [linkedInPosts, setLinkedInPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'blogs' | 'linkedin'>('all');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [blogsRes, linkedInRes] = await Promise.all([
          blogAPI.getPosts({ published: true }),
          externalContentAPI.getLinkedInPosts({ limit: 20 }).catch(() => ({ data: { data: [] } })),
        ]);
        
        setBlogs(blogsRes.data.data);
        setLinkedInPosts(linkedInRes.data.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const categories = ['All', ...new Set(blogs.map((blog) => blog.category))];

  const allContent = [
    ...blogs.map(b => ({ ...b, source: 'blog' })),
    ...linkedInPosts.map(p => ({ ...p, source: 'linkedin' })),
  ].sort((a, b) => new Date(b.createdAt || b.publishedAt).getTime() - new Date(a.createdAt || a.publishedAt).getTime());

  const displayContent = activeTab === 'all' ? allContent : 
                         activeTab === 'blogs' ? blogs.map(b => ({ ...b, source: 'blog' })) :
                         linkedInPosts.map(p => ({ ...p, source: 'linkedin' }));

  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-12 neon-text-green">
          <span className="glowing-text">{'> '}</span>
          blog_posts & articles
        </h1>

        {/* Tab Filter */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 terminal-border text-sm ${activeTab === 'all' ? 'bg-neon-green text-terminal-bg' : ''}`}
          >
            All ({allContent.length})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 terminal-border text-sm ${activeTab === 'blogs' ? 'bg-neon-cyan text-terminal-bg' : ''}`}
          >
            Blogs ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`px-4 py-2 terminal-border text-sm ${activeTab === 'linkedin' ? 'bg-neon-purple text-terminal-bg' : ''}`}
          >
            LinkedIn ({linkedInPosts.length})
          </button>
        </div>

        {/* Categories */}
        {activeTab !== 'linkedin' && (
          <div className="mb-12 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                className={`px-4 py-2 terminal-border text-sm ${
                  (selectedCategory === '' && cat === 'All') ||
                  selectedCategory === cat
                    ? 'bg-neon-green text-terminal-bg'
                    : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Content List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayContent.map((item: any, idx) => {
            const isLinkedIn = item.source === 'linkedin';
            const handleClick = () => {
              if (isLinkedIn && item.url) {
                window.open(item.url, '_blank', 'noopener,noreferrer');
              } else if (item.slug) {
                window.location.href = `/blog/${item.slug}`;
              }
            };

            return (
              <div
                key={item._id || idx}
                onClick={handleClick}
                className="terminal-border terminal-border-hover p-6 cursor-pointer hover:bg-opacity-10 hover:bg-neon-green transition-all"
              >
                {isLinkedIn && (
                  <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded mb-2 inline-block">LinkedIn</span>
                )}
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-40 object-cover mb-4 border border-neon-green opacity-50"
                  />
                )}
                <h3 className="text-lg font-bold mb-2 neon-text-cyan">{item.title}</h3>
                <p className="text-sm opacity-75 mb-4">{item.excerpt || item.description?.substring(0, 150)}</p>
                <div className="flex justify-between items-center text-xs opacity-50">
                  <span>{new Date(item.createdAt || item.publishedAt).toLocaleDateString()}</span>
                  {item.source === 'blog' && <span>👁️ {item.views} | ❤️ {item.likes}</span>}
                  {isLinkedIn && <span className="neon-text-cyan">View on LinkedIn →</span>}
                </div>
              </div>
            );
          })}
        </div>

        {displayContent.length === 0 && !isLoading && (
          <div className="terminal-border p-8 text-center">
            <p>No content available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
