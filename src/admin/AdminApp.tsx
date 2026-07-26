import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Settings from './Settings';
import PostManager from './PostManager';
import ContentConsole from './ContentConsole';

// A simple client-side passphrase check (not highly secure, but fine for a small personal blog)
const ADMIN_PASSPHRASE = 'ovicbookstore';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase === ADMIN_PASSPHRASE) {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
    } else {
      setError('Incorrect passphrase');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-[3px] border-ink p-8 rounded-2xl shadow-[4px_4px_0px_0px_var(--ink)]">
          <h1 className="font-display text-3xl font-semibold text-ink mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block font-sans font-semibold text-ink mb-2">Passphrase</label>
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full p-3 border-2 border-ink rounded-xl font-sans"
                placeholder="Enter passphrase..."
              />
            </div>
            {error && <p className="text-coral font-semibold text-sm">{error}</p>}
            <button
              type="submit"
              className="mt-4 w-full bg-coral text-cream font-display font-semibold py-3 rounded-xl border-2 border-ink hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--ink)] transition-all"
            >
              Login
            </button>
          </form>
          <div className="mt-6 pt-6 border-t-2 border-ink/10 text-center">
             {/* eslint-disable-next-line react/no-unescaped-entities */}
             <p className="text-sm text-ink-light italic">Note: Security relies on client-side state. For a small single-owner site without sensitive PII, this is acceptable tradeoff for simplicity.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Admin Nav */}
      <header className="bg-white border-b-2 border-ink py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <h1 className="font-display font-semibold text-xl text-ink tracking-wide">Ovic Admin</h1>
          <nav className="flex gap-4">
            <button
              onClick={() => setLocation('/posts')}
              className={`font-sans font-semibold px-4 py-2 rounded-lg transition-colors ${
                location.startsWith('/posts') || location === '/' ? 'bg-ink text-white' : 'text-ink hover:bg-cream-dark'
              }`}
            >
              Post Manager
            </button>
            <button
              onClick={() => setLocation('/content')}
              className={`font-sans font-semibold px-4 py-2 rounded-lg transition-colors ${
                location.startsWith('/content') ? 'bg-ink text-white' : 'text-ink hover:bg-cream-dark'
              }`}
            >
              Content Console
            </button>
            <button
              onClick={() => setLocation('/settings')}
              className={`font-sans font-semibold px-4 py-2 rounded-lg transition-colors ${
                location.startsWith('/settings') ? 'bg-ink text-white' : 'text-ink hover:bg-cream-dark'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="font-sans font-semibold text-coral hover:underline">View Site +'</a>
          <button onClick={handleLogout} className="font-sans font-medium text-ink-light hover:text-ink">Logout</button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-6">
        <Switch>
          <Route path="/" component={() => {
            setLocation('/posts');
            return null;
          }} />
          <Route path="/settings" component={Settings} />
          <Route path="/posts" component={PostManager} />
          <Route path="/content" component={ContentConsole} />
        </Switch>
      </main>
    </div>
  );
}
