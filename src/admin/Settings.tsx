import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [pat, setPat] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('github_pat');
    if (token) setPat(token);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('github_pat', pat);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">Settings</h1>
      <p className="font-sans text-ink-light mb-8">Configure your connection to GitHub to publish changes.</p>

      <div className="bg-white border-2 border-ink rounded-2xl p-8 shadow-[4px_4px_0px_0px_var(--ink)]">
        <h2 className="font-display text-xl font-semibold text-ink mb-4">GitHub Connection</h2>
        
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block font-sans font-semibold text-ink mb-2">Personal Access Token (PAT)</label>
            <p className="font-sans text-sm text-ink-light mb-4">
              Requires a fine-grained token with <strong>Contents: read and write</strong> permission scoped to this repository.
              Check `ADMIN_SETUP.md` in the project root for instructions.
            </p>
            <input
              type="password"
              value={pat}
              onChange={(e) => setPat(e.target.value)}
              className="w-full p-3 border-2 border-ink rounded-xl font-sans"
              placeholder="github_pat_..."
            />
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <button
              type="submit"
              className="bg-ink text-white font-display font-semibold px-6 py-3 rounded-xl hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--coral)] transition-all"
            >
              Save Settings
            </button>
            {saved && <span className="text-leaf font-semibold">Saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
