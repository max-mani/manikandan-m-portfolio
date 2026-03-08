import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readTime: number;
  content: string;
}

const BLOGS_DIR = path.join(process.cwd(), 'content', 'blogs');

function slugify(filename: string): string {
  return filename.replace(/\.md$/, '');
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const filePath = path.join(BLOGS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = slugify(file);
    return {
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || '',
      tag: (data.tag as string) || 'misc',
      excerpt: (data.excerpt as string) || '',
      readTime: (data.readTime as number) || 0,
      content,
    };
  });
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.map((p) => p.tag).filter(Boolean));
  return Array.from(tags).sort();
}

export function getAverageReadTime(): number {
  const posts = getAllPosts();
  if (posts.length === 0) return 0;
  const total = posts.reduce((sum, p) => sum + p.readTime, 0);
  return Math.round(total / posts.length);
}
