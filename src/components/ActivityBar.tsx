import React from 'react';
import { Files, Search, GitBranch, Blocks, Terminal } from 'lucide-react';
import { useStore, type SidebarView } from '../store/useStore';

export const ActivityBar: React.FC = () => {
  const { sidebarView, sidebarOpen, setSidebarView, toggleTerminal } = useStore();

  const buttons: { id: SidebarView | 'terminal'; label: string; icon: React.ReactNode }[] = [
    { id: 'explorer', label: 'Explorer', icon: <Files size={22} strokeWidth={1.5} /> },
    { id: 'search', label: 'Search', icon: <Search size={22} strokeWidth={1.5} /> },
    { id: 'git', label: 'Source Control', icon: <GitBranch size={22} strokeWidth={1.5} /> },
    { id: 'extensions', label: 'Extensions', icon: <Blocks size={22} strokeWidth={1.5} /> },
    { id: 'terminal', label: 'Terminal', icon: <Terminal size={22} strokeWidth={1.5} /> }
  ];

  const handleClick = (id: SidebarView | 'terminal') => {
    if (id === 'terminal') {
      toggleTerminal();
    } else {
      setSidebarView(id);
    }
  };

  return (
    <aside className="w-12 bg-vscode-activityBar border-r border-vscode-border flex flex-col justify-between items-center py-3 flex-shrink-0 select-none">
      <div className="flex flex-col gap-3 w-full items-center">
        {buttons.map((btn) => {
          const isActive = btn.id === 'terminal' ? false : (sidebarView === btn.id && sidebarOpen);
          return (
            <button
              key={btn.id}
              onClick={() => handleClick(btn.id)}
              title={btn.label}
              className={`w-12 h-12 flex items-center justify-center relative transition-colors cursor-pointer ${
                isActive ? 'text-[var(--accent)]' : 'text-vscode-muted hover:text-vscode-text'
              }`}
            >
              {btn.icon}
              {isActive && (
                <span 
                  className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
