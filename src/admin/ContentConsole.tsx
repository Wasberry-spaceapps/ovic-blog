import React, { useState, useEffect } from 'react';
import registry from '@/content/page-registry.json';
import { commitFile } from './github';

import homeContent from '@/content/site-copy/home.json';
import aboutContent from '@/content/site-copy/about.json';
import contactContent from '@/content/site-copy/contact.json';
import globalContent from '@/content/site-copy/global.json';
import shelfContent from '@/content/site-copy/shelf.json';
import recommendationsContent from '@/content/site-copy/recommendations.json';

const contentMap: Record<string, any> = {
  'home.json': homeContent,
  'about.json': aboutContent,
  'contact.json': contactContent,
  'global.json': globalContent,
  'shelf.json': shelfContent,
  'recommendations.json': recommendationsContent,
};

export default function ContentConsole() {
  const [selectedRoute, setSelectedRoute] = useState(registry[0].route);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const activeRegistry = registry.find(r => r.route === selectedRoute);
  
  useEffect(() => {
    if (activeRegistry) {
      const initialData = contentMap[activeRegistry.file] || {};
      setFormData({ ...initialData });
    }
  }, [selectedRoute, activeRegistry]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!activeRegistry) return;
    
    setIsSaving(true);
    setSuccessMsg('');
    
    try {
      const path = `src/content/site-copy/${activeRegistry.file}`;
      const content = JSON.stringify(formData, null, 2);
      await commitFile(path, content, `Update ${activeRegistry.file} via Admin Panel`);
      
      setSuccessMsg('Successfully saved! (Note: changes will be visible after rebuild/deploy)');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error(err);
      alert('Failed to save. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink mb-2">Global Content Console</h1>
          <p className="font-sans text-ink-light">Edit the structural text of the site.</p>
        </div>
      </div>

      <div className="bg-white border-[3px] border-ink rounded-[24px] p-6 shadow-[4px_4px_0px_0px_var(--ink)] mb-8">
        <label className="block font-sans font-semibold text-ink mb-2">Select Page to Edit</label>
        <select 
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="w-full p-3 border-2 border-ink rounded-xl font-sans bg-cream appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-coral"
        >
          {registry.map(r => (
            <option key={r.route} value={r.route}>
              {r.route === 'global' ? 'Global Navigation & Settings' : `Page: ${r.route}`}
            </option>
          ))}
        </select>
      </div>

      {activeRegistry && (
        <div className="bg-white border-[3px] border-ink rounded-[24px] p-8 shadow-[4px_4px_0px_0px_var(--ink)]">
          <h2 className="font-display text-xl font-semibold text-ink mb-6 pb-4 border-b-2 border-ink/10">
            Editing {activeRegistry.file}
          </h2>
          
          <div className="flex flex-col gap-6">
            {activeRegistry.fields.map(field => (
              <div key={field.key}>
                <label className="block font-sans font-semibold text-ink mb-2">{field.label}</label>
                {formData[field.key] && formData[field.key].length > 100 ? (
                  <textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full p-4 border-2 border-ink rounded-xl font-sans min-h-[120px] focus:outline-none focus:border-coral"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full p-3 border-2 border-ink rounded-xl font-sans focus:outline-none focus:border-coral"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t-2 border-ink/10 flex items-center justify-between">
            {successMsg ? (
              <span className="font-sans font-medium text-leaf">{successMsg}</span>
            ) : (
              <span /> // spacer
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`bg-coral text-cream font-display font-semibold px-8 py-3 rounded-xl border-2 border-ink hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--ink)] transition-all ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? 'Saving...' : 'Publish Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
