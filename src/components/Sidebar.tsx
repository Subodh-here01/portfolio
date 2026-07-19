import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { virtualFileSystem } from '../data/fileSystem';

export const Sidebar: React.FC = () => {
  const { sidebarView, sidebarOpen, openFile, activeTabId } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!sidebarOpen) return null;

  // Search filter files
  const searchFiles = [
    { name: "index.html (About Subodh)", path: "/index.html", icon: "📄" },
    { name: "projects.json (Project gallery)", path: "/projects.json", icon: "📄" },
    { name: "experience.yaml (Work & Education)", path: "/experience.yaml", icon: "yaml" },
    { name: "cp.java (Competitive programming)", path: "/cp.java", icon: "java" },
    { name: "contact.md (Contact)", path: "/contact.md", icon: "md" },
    { name: "settings.json (Configure Theme)", path: "/settings.json", icon: "📄" }
  ].filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const commits = [
    { msg: "vega: WhatsApp Chatbot release", date: "Jul 2026", sha: "9ea192a" },
    { msg: "rit: B.E. Graduation track", date: "2023 - 2027", sha: "d3d47ff" },
    { msg: "project: CodeMeet WebRTC sync", date: "Jan 2026", sha: "e02a2bf" }
  ];

  const extensions = [
    { name: "Java Platform", installs: "1.5M", rating: "★★★★★", version: "v17.4" },
    { name: "React Ecosystem", installs: "2.4M", rating: "★★★★★", version: "v18.2" },
    { name: "NodeJS Backend", installs: "980K", rating: "★★★★☆", version: "v20.1" }
  ];

  return (
    <aside className="w-[210px] bg-vscode-sidebar border-r border-vscode-border flex flex-col p-4 flex-shrink-0 select-none font-mono text-xs overflow-y-auto absolute md:relative left-12 md:left-0 top-8 bottom-[22px] z-40 shadow-2xl md:shadow-none h-[calc(100%-54px)] md:h-auto">
      {/* 1. EXPLORER VIEW */}
      {sidebarView === 'explorer' && (
        <div className="flex flex-col h-full">
          <div className="text-[10px] font-bold text-vscode-muted tracking-wider mb-3">WORKSPACE</div>
          <div>
            <span className="font-semibold text-vscode-text block mb-1">📁 {virtualFileSystem.name}</span>
            <div className="pl-3 border-l border-vscode-border">
              {virtualFileSystem.children?.map((file) => {
                const isActive = activeTabId === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => openFile(file.path, file.name, file.icon || '📄')}
                    className={`w-full text-left py-1 block hover:text-vscode-text cursor-pointer transition-all ${
                      isActive ? 'text-[var(--accent)] font-medium pl-1' : 'text-vscode-muted'
                    }`}
                  >
                    📄 {file.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. SEARCH VIEW */}
      {sidebarView === 'search' && (
        <div className="flex flex-col h-full">
          <div className="text-[10px] font-bold text-vscode-muted tracking-wider mb-3">SEARCH</div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-vscode-activityBar border border-vscode-border rounded p-2 text-vscode-text outline-none mb-4"
          />
          <div className="flex flex-col gap-2 overflow-y-auto">
            {searchQuery && searchFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => openFile(file.path, file.name.split(' ')[0], file.icon)}
                className="w-full text-left p-2 rounded bg-white/2 hover:bg-white/5 text-vscode-muted hover:text-vscode-text cursor-pointer"
              >
                {file.name}
              </button>
            ))}
            {searchQuery && searchFiles.length === 0 && (
              <div className="text-vscode-muted text-center py-4">No results found</div>
            )}
          </div>
        </div>
      )}

      {/* 3. SOURCE CONTROL VIEW */}
      {sidebarView === 'git' && (
        <div className="flex flex-col h-full">
          <div className="text-[10px] font-bold text-vscode-muted tracking-wider mb-3">SOURCE CONTROL</div>
          <div className="flex flex-col gap-3 pt-2">
            {commits.map((commit, idx) => (
              <div key={idx} className="border-l-2 border-[var(--accent)] pl-2.5 flex flex-col gap-0.5">
                <span className="text-vscode-text font-medium leading-tight">{commit.msg}</span>
                <span className="text-[10px] text-vscode-muted">{commit.date}</span>
                <span className="text-[9px] text-[var(--accent)]/80">{commit.sha}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. EXTENSIONS VIEW */}
      {sidebarView === 'extensions' && (
        <div className="flex flex-col h-full">
          <div className="text-[10px] font-bold text-vscode-muted tracking-wider mb-3">INSTALLED EXTENSIONS</div>
          <div className="flex flex-col gap-3 pt-2 overflow-y-auto">
            {extensions.map((ext, idx) => (
              <div key={idx} className="border border-vscode-border bg-white/2 p-2.5 rounded flex flex-col gap-1">
                <div className="text-vscode-text font-semibold">{ext.name}</div>
                <div className="text-[10px] text-vscode-muted">{ext.installs} installs · {ext.version}</div>
                <div className="text-[10px] text-amber-500">{ext.rating}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
