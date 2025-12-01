'use client';

import React, { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';
import { blogAPI } from '@/lib/api';
import { BlogPost } from '@/types';
import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogAPI.getPostBySlug(slug);
        setBlog(response.data);
      } catch (error: any) {
        console.error('Error fetching blog:', error);
        setError('Blog post not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const handleLike = async () => {
    if (!blog) return;
    try {
      await blogAPI.likePost(blog._id);
      setBlog({ ...blog, likes: blog.likes + 1 });
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="terminal-border p-8">Loading blog post...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="terminal-border p-8 text-center">
          <p className="mb-4 text-neon-pink">{error || 'Blog post not found'}</p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Blog Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-terminal-text">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm opacity-70 mb-4">
            <span>📅 {new Date(blog.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span>👁️ {blog.views} views</span>
            <span>❤️ {blog.likes} likes</span>
            {blog.category && <span className="text-neon-cyan">📁 {blog.category}</span>}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs border border-neon-purple text-neon-purple"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {blog.thumbnail && (
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover border border-neon-green mb-8"
            />
          )}
        </header>

        {/* Blog Content */}
        <div className="terminal-border p-8 mb-8">
          {typeof blog.content === 'string' ? (
            <div className="prose prose-invert max-w-none">
              {(blog.content as string).split('\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="mb-4 text-terminal-text leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : Array.isArray(blog.content) ? (
            <div className="prose prose-invert max-w-none">
              {blog.content.map((block: any, idx: number) => {
                switch (block.type) {
                  case 'heading':
                    const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
                    return (
                      <HeadingTag key={idx} className="font-bold neon-text-cyan mb-4 mt-6">
                        {block.text}
                      </HeadingTag>
                    );
                  case 'code':
                    return (
                      <pre key={idx} className="bg-black p-4 rounded mb-4 overflow-x-auto border border-neon-green">
                        <code className="text-neon-green text-sm">{block.code}</code>
                      </pre>
                    );
                  case 'image':
                    return (
                      <figure key={idx} className="my-6">
                        <img src={block.imageUrl} alt={block.imageCaption || ''} className="w-full border border-neon-cyan" />
                        {block.imageCaption && (
                          <figcaption className="text-sm opacity-70 mt-2 text-center">{block.imageCaption}</figcaption>
                        )}
                      </figure>
                    );
                  case 'list':
                    const ListTag = block.listType === 'ordered' ? 'ol' : 'ul';
                    return (
                      <ListTag key={idx} className="list-disc ml-6 mb-4">
                        {block.listItems?.map((item: string, i: number) => (
                          <li key={i} className="mb-2">{item}</li>
                        ))}
                      </ListTag>
                    );
                  default:
                    return (
                      <p key={idx} className="mb-4 leading-relaxed">
                        {block.text}
                      </p>
                    );
                }
              })}
            </div>
          ) : (
            <div className="text-center opacity-50">No content available</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleLike}
            className="px-6 py-2 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-terminal-bg transition-colors"
          >
            ❤️ Like ({blog.likes})
          </button>
          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert('Link copied to clipboard!');
            }}
            className="px-6 py-2 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-terminal-bg transition-colors"
          >
            🔗 Share
          </button>
        </div>

        {/* Back to Blog List */}
        <div className="text-center pt-8 border-t border-neon-green">
          <a href="/blog" className="text-neon-cyan hover:underline">
            ← Back to all blog posts
          </a>
        </div>
      </article>
    </div>
  );
}
