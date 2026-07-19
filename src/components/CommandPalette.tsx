import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { openFile, setSidebarView, toggleSidebar, setAccentColor } = useStore();

  const actions = [
    { name: "index.html (About Subodh)", type: "file", path: "/index.html", icon: "📄" },
    { name: "projects.json (Project gallery)", type: "file", path: "/projects.json", icon: "📄" },
    { name: "experience.yaml (Work & Education)", type: "file", path: "/experience.yaml", icon: "yaml" },
    { name: "cp.java (Competitive programming)", type: "file", path: "/cp.java", icon: "java" },
    { name: "contact.md (Get in touch)", type: "file", path: "/contact.md", icon: "md" },
    { name: "settings.json (Configure IDE)", type: "file", path: "/settings.json", icon: "📄" },
    { name: "View: Toggle Sidebar", type: "action", action: () => toggleSidebar() },
    { name: "View: Show Explorer", type: "action", action: () => setSidebarView('explorer') },
    { name: "View: Show Search Panel", type: "action", action: () => setSidebarView('search') },
    { name: "View: Show Source Control", type: "action", action: () => setSidebarView('git') },
    { name: "View: Show Extensions", type: "action", action: () => setSidebarView('extensions') },
    { name: "Theme: Accent Blue", type: "action", action: () => setAccentColor('blue') },
    { name: "Theme: Accent Green", type: "action", action: () => setAccentColor('green') },
    { name: "Theme: Accent Amber", type: "action", action: () => setAccentColor('amber') },
    { name: "Theme: Accent Purple", type: "action", action: () => setAccentColor('purple') },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'p')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filtered = actions.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item: typeof actions[0]) => {
    if (item.type === 'file') {
      openFile(item.path!, item.name.split(' ')[0], item.icon!);
    } else if (item.action) {
      item.action();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleNav = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, selectedIndex, filtered]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex justify-center items-start pt-20"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-[600px] bg-vscode-editor border border-vscode-accent rounded-lg shadow-2xl overflow-hidden flex flex-col mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search files or execute settings action..."
              className="w-full bg-vscode-activityBar border-b border-vscode-border p-3 text-vscode-text font-sans text-sm outline-none"
            />
            <div className="max-h-[320px] overflow-y-auto py-1">
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex justify-between items-center px-5 py-2.5 cursor-pointer font-mono text-xs transition-colors ${
                    idx === selectedIndex ? 'bg-vscode-accent/20 text-vscode-text' : 'text-vscode-muted'
                  }`}
                >
                  <span>{item.type === 'file' ? `📄 ${item.name}` : `⚙️ ${item.name}`}</span>
                  <span className="opacity-50 text-[10px]">
                    {item.type === 'file' ? 'File' : 'Action'}
                  </span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="p-4 text-center text-xs text-vscode-muted font-mono">
                  No matching files or commands
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
