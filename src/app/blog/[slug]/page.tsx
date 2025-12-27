
import fs from 'fs/promises';
import path from 'path';
import BackButton from '@/components/BackButton';
import dynamic from 'next/dynamic';

const TiptapReadOnly = dynamic(() => import('@/components/TiptapReadOnly'), { ssr: false });

export async function generateStaticParams() {
  const blogsDir = path.join(process.cwd(), 'apps/frontend/content/blogs');
  const files = await fs.readdir(blogsDir);
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => ({ slug: f.replace(/\.json$/, '') }));
}

export const revalidate = 3600; // ISR: revalidate every hour

async function getBlogBySlug(slug: string) {
  const filePath = path.join(process.cwd(), 'apps/frontend/content/blogs', `${slug}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="terminal-border p-8 text-center">
          <p className="mb-4 text-neon-pink">Blog post not found</p>
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
            <span>📅 {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>👁️ {blog.views} views</span>
            <span>❤️ {blog.likes} likes</span>
            {blog.category && <span className="text-neon-cyan">📁 {blog.category}</span>}
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag: string, idx: number) => (
                <span key={idx} className="px-3 py-1 text-xs border border-neon-purple text-neon-purple">#{tag}</span>
              ))}
            </div>
          )}
          {blog.thumbnail && (
            <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 md:h-96 object-cover border border-neon-green mb-8" />
          )}
        </header>
        {/* Blog Content */}
        <div className="terminal-border p-8 mb-8">
          {blog.content && typeof blog.content === 'object' && !Array.isArray(blog.content) && blog.content.type === 'doc' ? (
            <TiptapReadOnly content={blog.content} />
          ) : typeof blog.content === 'string' ? (
            <div className="prose prose-invert max-w-none">
              {blog.content.split('\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="mb-4 text-terminal-text leading-relaxed">{paragraph}</p>
              ))}
            </div>
          ) : Array.isArray(blog.content) ? (
            <div className="prose prose-invert max-w-none">
              {blog.content.map((block: any, idx: number) => {
                switch (block.type) {
                  case 'heading':
                    const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
                    return <HeadingTag key={idx} className="font-bold neon-text-cyan mb-4 mt-6">{block.text}</HeadingTag>;
                  case 'code':
                    return <pre key={idx} className="bg-black p-4 rounded mb-4 overflow-x-auto border border-neon-green"><code className="text-neon-green text-sm">{block.code}</code></pre>;
                  case 'image':
                    return <figure key={idx} className="my-6"><img src={block.imageUrl} alt={block.imageCaption || ''} className="w-full border border-neon-cyan" />{block.imageCaption && (<figcaption className="text-sm opacity-70 mt-2 text-center">{block.imageCaption}</figcaption>)}</figure>;
                  case 'list':
                    const ListTag = block.listType === 'ordered' ? 'ol' : 'ul';
                    return <ListTag key={idx} className="list-disc ml-6 mb-4">{block.listItems?.map((item: string, i: number) => (<li key={i} className="mb-2">{item}</li>))}</ListTag>;
                  default:
                    return <p key={idx} className="mb-4 leading-relaxed">{block.text}</p>;
                }
              })}
            </div>
          ) : (
            <div className="text-center opacity-50">No content available</div>
          )}
        </div>
        {/* Actions */}
        {/* (Optional: Like/Share buttons can be re-added with static-friendly logic) */}
        {/* Back to Blog List */}
        <div className="text-center pt-8 border-t border-neon-green">
          <a href="/blog" className="text-neon-cyan hover:underline">← Back to all blog posts</a>
        </div>
      </article>
    </div>
  );
}
