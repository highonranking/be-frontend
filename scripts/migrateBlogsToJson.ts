// Load environment variables from .env.local
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
// Script to export all blogs from MongoDB to JSON files in /content/blogs

import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "";
// Fix for __dirname in ES module scope
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '../content/blogs');

// BlogPost type (should match your backend)


const blogPostSchema = new mongoose.Schema({}, { strict: false });
const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'blogposts');

async function migrate() {
  await mongoose.connect(MONGO_URI);
  const blogs = await BlogPost.find({});
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const blog of blogs) {
    const data: any = blog.toObject();
    // Fallback for missing slug: use title (kebab-case) or _id
    let slug = data.slug;
    if (!slug && data.title) {
      slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (!slug) {
      slug = data._id ? String(data._id) : `blog-${Math.random().toString(36).slice(2, 10)}`;
    }
    data.slug = slug;
    const filePath = path.join(OUTPUT_DIR, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Exported: ${filePath}`);
  }
  await mongoose.disconnect();
  console.log('Migration complete.');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
