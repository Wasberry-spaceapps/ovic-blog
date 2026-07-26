export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  Component: React.ComponentType;
}

// @ts-ignore - Vite glob import
const modules = import.meta.glob('../content/posts/*.mdx', { eager: true });

export function getPosts(): Post[] {
  const posts = Object.entries(modules).map(([path, mod]: [string, any]) => {
    return {
      slug: mod.frontmatter?.slug || path.replace('../content/posts/', '').replace('.mdx', ''),
      frontmatter: mod.frontmatter,
      Component: mod.default,
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

export function getPost(slug: string): Post | undefined {
  const posts = getPosts();
  return posts.find((p) => p.slug === slug);
}
