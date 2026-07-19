import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export const EditorTabs: React.FC = () => {
  const { openTabs, activeTabId, setActiveTab, closeFile, reducedMotion } = useStore();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleCloseClick = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    closeFile(tabId);
  };

  return (
    <div className="flex bg-vscode-activityBar/70 border-b border-vscode-border overflow-x-auto scrollbar-none flex-shrink-0 select-none">
      <AnimatePresence initial={false}>
        {openTabs.map((tab) => {
          const isActive = tab.path === activeTabId;
            const getTabIcon = (icon: string) => {
              if (icon === 'yaml') return '⚙️';
              if (icon === 'java') return '☕';
              if (icon === 'md') return '📝';
              return icon;
            };

            return (
              <motion.div
                key={tab.path}
                initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
                animate={reducedMotion ? {} : { opacity: 1, x: 0 }}
                exit={reducedMotion ? {} : { opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => handleTabClick(tab.path)}
                className={`inline-flex items-center gap-2 px-4 py-2 border-r border-vscode-border cursor-pointer relative text-xs font-mono transition-all whitespace-nowrap group ${
                  isActive 
                    ? 'bg-vscode-editor/40 text-vscode-text font-medium' 
                    : 'text-vscode-muted hover:bg-white/2 hover:text-vscode-text'
                }`}
              >
                <span>{getTabIcon(tab.icon)} {tab.name}</span>
                <button
                  onClick={(e) => handleCloseClick(e, tab.path)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded px-1 text-[10px] text-vscode-muted hover:text-vscode-text transition-opacity ml-1 cursor-pointer"
                >
                  ×
                </button>
                {isActive && (
                  <span 
                    className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)] shadow-[0_1px_6px_var(--accent)]"
                  />
                )}
              </motion.div>
            );
        })}
      </AnimatePresence>
    </div>
  );
};
