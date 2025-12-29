"use client";

// Helper to extract plain text from TipTap JSON
function extractTextFromTiptap(content: any): string {
  if (!content || typeof content !== 'object') return '';
  if (Array.isArray(content)) return content.map(extractTextFromTiptap).join(' ');
  if (content.type === 'text' && content.text) return content.text;
  if (content.content) return extractTextFromTiptap(content.content);
  return '';
}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import BackButton from '@/components/BackButton';
import { blogAPI, externalContentAPI } from '@/lib/api';
import { BlogPost } from '@/types';

export default function BlogPage() {
  // Blogs state
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsPage, setBlogsPage] = useState(1);
  const blogsLimit = 5;
  const [blogsHasMore, setBlogsHasMore] = useState(true);
  const [isFetchingBlogs, setIsFetchingBlogs] = useState(false);

  // LinkedIn state
  const [linkedInPosts, setLinkedInPosts] = useState<any[]>([]);
  const [linkedInPage, setLinkedInPage] = useState(1);
  const linkedInLimit = 5;
  const [linkedInHasMore, setLinkedInHasMore] = useState(true);
  const [isFetchingLinkedIn, setIsFetchingLinkedIn] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'blogs' | 'linkedin'>('all');

  // Initial fetch and reset on tab/category change
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        if (activeTab === 'blogs') {
          const blogsRes = await blogAPI.getPosts({ published: true, limit: blogsLimit, skip: 0 });
          setBlogs(blogsRes.data.data);
          setBlogsPage(1);
          setBlogsHasMore(blogsRes.data.pagination.skip + blogsRes.data.data.length < blogsRes.data.pagination.total);
        } else if (activeTab === 'linkedin') {
          const linkedInRes = await externalContentAPI.getLinkedInPosts({ limit: linkedInLimit, skip: 0 }).catch(() => ({ data: { data: [] } }));
          setLinkedInPosts(linkedInRes.data.data);
          setLinkedInPage(1);
          setLinkedInHasMore(linkedInRes.data.data.length === linkedInLimit);
        } else if (activeTab === 'all') {
          const [blogsRes, linkedInRes] = await Promise.all([
            blogAPI.getPosts({ published: true, limit: blogsLimit, skip: 0 }),
            externalContentAPI.getLinkedInPosts({ limit: linkedInLimit, skip: 0 }).catch(() => ({ data: { data: [] } })),
          ]);
          setBlogs(blogsRes.data.data);
          setBlogsPage(1);
          setBlogsHasMore(blogsRes.data.pagination.skip + blogsRes.data.data.length < blogsRes.data.pagination.total);
          setLinkedInPosts(linkedInRes.data.data);
          setLinkedInPage(1);
          setLinkedInHasMore(linkedInRes.data.data.length === linkedInLimit);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [activeTab, selectedCategory]);

  // Infinite scroll: fetch more blogs
  const fetchMoreBlogs = useCallback(async () => {
    if (isFetchingBlogs || !blogsHasMore) return;
    setIsFetchingBlogs(true);
    try {
      const nextPage = blogsPage + 1;
      const skip = (nextPage - 1) * blogsLimit;
      const blogsRes = await blogAPI.getPosts({ published: true, limit: blogsLimit, skip });
      setBlogs(prev => [...prev, ...blogsRes.data.data]);
      setBlogsPage(nextPage);
      setBlogsHasMore((skip + blogsRes.data.data.length) < blogsRes.data.pagination.total);
    } catch (error) {
      console.error('Error fetching more blogs:', error);
    } finally {
      setIsFetchingBlogs(false);
    }
  }, [isFetchingBlogs, blogsHasMore, blogsPage]);

  // Infinite scroll: fetch more LinkedIn posts
  const fetchMoreLinkedIn = useCallback(async () => {
    if (isFetchingLinkedIn || !linkedInHasMore) return;
    setIsFetchingLinkedIn(true);
    try {
      const nextPage = linkedInPage + 1;
      const skip = (nextPage - 1) * linkedInLimit;
      const linkedInRes = await externalContentAPI.getLinkedInPosts({ limit: linkedInLimit, skip }).catch(() => ({ data: { data: [] } }));
      setLinkedInPosts(prev => [...prev, ...linkedInRes.data.data]);
      setLinkedInPage(nextPage);
      setLinkedInHasMore(linkedInRes.data.data.length === linkedInLimit);
    } catch (error) {
      console.error('Error fetching more LinkedIn posts:', error);
    } finally {
      setIsFetchingLinkedIn(false);
    }
  }, [isFetchingLinkedIn, linkedInHasMore, linkedInPage]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (
      (activeTab === 'blogs' && blogsHasMore) ||
      (activeTab === 'linkedin' && linkedInHasMore) ||
      (activeTab === 'all' && (blogsHasMore || linkedInHasMore))
    ) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (activeTab === 'blogs') fetchMoreBlogs();
            else if (activeTab === 'linkedin') fetchMoreLinkedIn();
            else if (activeTab === 'all') {
              fetchMoreBlogs();
              fetchMoreLinkedIn();
            }
          }
        },
        { threshold: 1 }
      );
      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }
    }
    return () => {
      if (loaderRef?.current && observer) observer.unobserve(loaderRef.current);
    };
  }, [activeTab, blogsHasMore, linkedInHasMore, fetchMoreBlogs, fetchMoreLinkedIn]);

  const categories = ['All', ...new Set(blogs.map((blog) => blog.category))];

  const allContent = [
    ...blogs.map(b => ({ ...b, source: 'blog' })),
    ...linkedInPosts.map(p => ({ ...p, source: 'linkedin' })),
  ].sort((a, b) => new Date(b.createdAt || b.publishedAt).getTime() - new Date(a.createdAt || a.publishedAt).getTime());

  const displayContent = activeTab === 'all' ? allContent :
    activeTab === 'blogs' ? blogs.map(b => ({ ...b, source: 'blog' })) :
    linkedInPosts.map(p => ({ ...p, source: 'linkedin' }));

  // Pagination controls
  // const totalPages = Math.ceil((pagination?.total || 0) / limit);

  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-12 neon-text-green">
         <BackButton />
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
                <p className="text-sm opacity-75 mb-4">
                  {item.excerpt
                    || (typeof item.content === 'string'
                      ? item.content.slice(0, 180)
                      : Array.isArray(item.content)
                        ? item.content.map((b: any) => b.text).filter(Boolean).join(' ').slice(0, 180)
                        : (item.content && item.content.type === 'doc')
                          ? extractTextFromTiptap(item.content).slice(0, 180)
                          : item.description?.substring(0, 150))}
                </p>
                <div className="flex justify-between items-center text-xs opacity-50">
                  <span>{new Date(item.createdAt || item.publishedAt).toLocaleDateString()}</span>
                  {item.source === 'blog' && <span>👁️ {item.views} | ❤️ {item.likes}</span>}
                  {isLinkedIn && <span className="neon-text-cyan">View on LinkedIn →</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Infinite Scroll Loader */}
        {(activeTab === 'blogs' || activeTab === 'linkedin' || activeTab === 'all') && (
          <div ref={loaderRef} className="flex justify-center items-center mt-8 min-h-[40px]">
            {(activeTab === 'blogs' && isFetchingBlogs) && <span className="text-sm">Loading more blogs...</span>}
            {(activeTab === 'linkedin' && isFetchingLinkedIn) && <span className="text-sm">Loading more LinkedIn posts...</span>}
            {(activeTab === 'all' && (isFetchingBlogs || isFetchingLinkedIn)) && <span className="text-sm">Loading more...</span>}
            {(activeTab === 'blogs' && !blogsHasMore) && <span className="text-sm opacity-50">No more blogs to load.</span>}
            {(activeTab === 'linkedin' && !linkedInHasMore) && <span className="text-sm opacity-50">No more LinkedIn posts to load.</span>}
            {(activeTab === 'all' && !blogsHasMore && !linkedInHasMore) && <span className="text-sm opacity-50">No more content to load.</span>}
          </div>
        )}

        {displayContent.length === 0 && !isLoading && (
          <div className="terminal-border p-8 text-center">
            <p>No content available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
