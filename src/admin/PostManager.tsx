import React, { useState, useEffect } from 'react';
import { getPosts, Post } from '@/lib/posts';
import { commitFile, deleteFile } from './github';

// @ts-ignore
const rawModules = import.meta.glob('../content/posts/*.mdx', { query: '?raw', import: 'default', eager: true });

export default function PostManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  
  // Editor state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Initial load
  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleSelectPost = (slug: string) => {
    setSelectedSlug(slug);
    
    if (slug === 'new') {
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      setExcerpt('');
      setContent('');
      return;
    }

    const post = posts.find(p => p.slug === slug);
    if (post) {
      setTitle(post.frontmatter.title);
      setDate(post.frontmatter.date);
      setExcerpt(post.frontmatter.excerpt);
      
      const rawKey = `../content/posts/${slug}.mdx`;
      const rawContent = rawModules[rawKey] as string;
      
      // Extract just the body by stripping the frontmatter
      if (rawContent) {
        const bodyMatch = rawContent.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
        setContent(bodyMatch ? bodyMatch[1].trim() : rawContent);
      } else {
        setContent('');
      }
    }
  };

  const constructMDX = () => {
    return `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
---

${content}
`;
  };

  const handleSave = async () => {
    if (!title || !date) return alert('Title and date are required');
    
    setIsSaving(true);
    setSuccessMsg('');
    
    // Create a slug from title if it's a new post, else use existing slug
    const slug = selectedSlug === 'new' 
      ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : selectedSlug!;
      
    const path = `src/content/posts/${slug}.mdx`;
    const finalContent = constructMDX();
    
    try {
      await commitFile(path, finalContent, `Update post: ${title} via Admin Panel`);
      setSuccessMsg('Successfully saved! (Note: changes will be visible after rebuild)');
      setTimeout(() => setSuccessMsg(''), 5000);
      
      if (selectedSlug === 'new') {
        setSelectedSlug(slug);
        // Add to local state optimistically
        setPosts(prev => [{
          slug,
          frontmatter: { title, date, excerpt, slug },
          Component: () => null // Placeholder
        }, ...prev]);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save. Check console.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (selectedSlug === 'new' || !selectedSlug) {
      setSelectedSlug(null);
      return;
    }
    
    if (!confirm(`Are you sure you want to delete ${title}?`)) return;
    
    setIsDeleting(true);
    
    try {
      const path = `src/content/posts/${selectedSlug}.mdx`;
      await deleteFile(path, `Delete post: ${title} via Admin Panel`);
      
      // Update local state optimistically
      setPosts(prev => prev.filter(p => p.slug !== selectedSlug));
      setSelectedSlug(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete. Check console.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden gap-6">
      {/* Sidebar List */}
      <div className="w-1/3 max-w-sm bg-white border-r-2 border-ink p-4 flex flex-col h-full rounded-2xl border-2 shadow-[4px_4px_0px_0px_var(--ink)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-semibold text-ink">Posts</h2>
          <button 
            onClick={() => handleSelectPost('new')}
            className="bg-coral text-cream font-sans font-semibold px-4 py-2 rounded-lg hover:shadow-[2px_2px_0px_0px_var(--ink)] border-2 border-ink transition-all"
          >
            + New
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-2">
          {posts.map(post => (
            <div 
              key={post.slug}
              onClick={() => handleSelectPost(post.slug)}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                selectedSlug === post.slug 
                  ? 'bg-cream border-ink shadow-[2px_2px_0px_0px_var(--ink)]' 
                  : 'border-transparent hover:border-ink/20 hover:bg-cream-dark'
              }`}
            >
              <h3 className="font-display font-semibold text-ink text-lg line-clamp-1">{post.frontmatter.title}</h3>
              <p className="font-sans text-sm text-ink-light">{new Date(post.frontmatter.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Pane */}
      <div className="flex-1 bg-white border-2 border-ink rounded-2xl p-6 flex flex-col shadow-[4px_4px_0px_0px_var(--ink)]">
        {!selectedSlug ? (
          <div className="flex-1 flex items-center justify-center text-ink-light font-sans font-medium text-lg">
            Select a post to edit, or create a new one.
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex justify-between items-center mb-6 border-b-2 border-ink/10 pb-4">
              <h2 className="font-display text-2xl font-semibold text-ink">
                {selectedSlug === 'new' ? 'New Post' : 'Edit Post'}
              </h2>
              <div className="flex items-center gap-4">
                {successMsg && <span className="text-leaf font-semibold text-sm">{successMsg}</span>}
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting || isSaving}
                  className="text-coral font-sans font-semibold hover:underline px-4 py-2"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving || isDeleting}
                  className="bg-ink text-white font-sans font-semibold px-6 py-2 rounded-xl hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_var(--coral)] transition-all"
                >
                  {isSaving ? 'Saving...' : 'Save Post'}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 flex gap-6">
              <div className="w-1/2 flex flex-col gap-4">
                <div>
                  <label className="block font-sans font-semibold text-ink mb-1">Title</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="w-full p-3 border-2 border-ink rounded-xl font-sans focus:outline-none focus:border-coral"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-ink mb-1">Publish Date</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                    className="w-full p-3 border-2 border-ink rounded-xl font-sans focus:outline-none focus:border-coral"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-ink mb-1">Excerpt</label>
                  <textarea 
                    value={excerpt} 
                    onChange={e => setExcerpt(e.target.value)} 
                    className="w-full p-3 border-2 border-ink rounded-xl font-sans min-h-[100px] focus:outline-none focus:border-coral"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="block font-sans font-semibold text-ink mb-1">Markdown Body</label>
                  <textarea 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                    className="flex-1 w-full p-4 border-2 border-ink rounded-xl font-mono text-sm min-h-[300px] focus:outline-none focus:border-coral resize-none"
                    placeholder="Write your post here in Markdown..."
                  />
                </div>
              </div>
              
              <div className="w-1/2 flex flex-col">
                 <label className="block font-sans font-semibold text-ink mb-1">Preview (Raw Markdown Structure)</label>
                 <div className="flex-1 w-full p-6 border-2 border-ink/20 rounded-xl bg-cream-dark overflow-y-auto prose prose-p:font-sans prose-headings:font-display">
                    <h1>{title || 'Post Title'}</h1>
                    <p><em>{excerpt || 'Post excerpt will appear here.'}</em></p>
                    <hr />
                    <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 m-0 text-ink">{content}</pre>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
