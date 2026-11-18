// public/posts/<slug>/index.html 을 빌드할 때 읽어서 글 목록을 만든다.
// 글 쪽에서 <title>, <meta name="description">, <meta name="post:*"> 만 채우면 홈에 자동으로 올라간다.
import fs from 'node:fs';
import path from 'node:path';

export interface PostInfo {
  slug: string; title: string; description: string;
  date: string; category: string; tags: string[]; draft: boolean;
}

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function meta(html: string, name: string): string {
  const re = new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']*)["']`, 'i');
  return decode(html.match(re)?.[1]?.trim() ?? '');
}

export function getPosts(): PostInfo[] {
  const dir = path.join(process.cwd(), 'public', 'posts');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(dir, d.name, 'index.html')))
    .map((d) => {
      const html = fs.readFileSync(path.join(dir, d.name, 'index.html'), 'utf8');
      const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? d.name).replace(/\s*·\s*naedevlog\s*$/, '');
      return {
        slug: d.name,
        title,
        description: meta(html, 'description'),
        date: meta(html, 'post:date'),
        category: meta(html, 'post:category') || '기타',
        tags: meta(html, 'post:tags').split(',').map((t) => t.trim()).filter(Boolean),
        draft: meta(html, 'post:draft') === 'true',
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}
