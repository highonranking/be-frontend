
import fs from 'fs/promises';
import path from 'path';
import BackButton from '@/components/BackButton';

// Helper to extract plain text from TipTap JSON
function extractTextFromTiptap(content: any): string {
  if (!content || typeof content !== 'object') return '';
  if (Array.isArray(content)) return content.map(extractTextFromTiptap).join(' ');
  if (content.type === 'text' && content.text) return content.text;
  if (content.content) return extractTextFromTiptap(content.content);
  return '';
}

export const revalidate = 3600;

async function getAllBlogs() {
  const blogsDir = path.join(process.cwd(), 'apps/frontend/content/blogs');
  const files = await fs.readdir(blogsDir);
  const blogs = await Promise.all(
    files.filter(f => f.endsWith('.json')).map(async (f) => {
      const data = await fs.readFile(path.join(blogsDir, f), 'utf-8');
      return JSON.parse(data);
    })
  );
  return blogs.filter((b) => b.published !== false);
}

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  const categories = ['All', ...Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-12 neon-text-green">
          <BackButton />
          blog_posts & articles
        </h1>

        {/* Categories */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat}
              href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 terminal-border text-sm ${cat === 'All' ? 'bg-neon-green text-terminal-bg' : ''}`}
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Content List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item: any, idx: number) => (
            <a
              key={item.slug || idx}
              href={`/blog/${item.slug}`}
              className="terminal-border terminal-border-hover p-6 block hover:bg-opacity-10 hover:bg-neon-green transition-all"
            >
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
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                <span>👁️ {item.views} | ❤️ {item.likes}</span>
              </div>
            </a>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="terminal-border p-8 text-center">
            <p>No content available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
