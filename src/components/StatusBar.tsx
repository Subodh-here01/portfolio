import React, { useEffect, useState } from 'react';
import { GitBranch } from 'lucide-react';
import { useStore } from '../store/useStore';

export const StatusBar: React.FC = () => {
  const { activeTabId } = useStore();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      try {
        setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
      } catch (e) {
        setTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getLanguageMode = () => {
    if (!activeTabId) return 'Plain Text';
    if (activeTabId.endsWith('.html')) return 'HTML';
    if (activeTabId.endsWith('.json')) return 'JSON';
    if (activeTabId.endsWith('.yaml')) return 'YAML';
    if (activeTabId.endsWith('.java')) return 'Java';
    if (activeTabId.endsWith('.md')) return 'Markdown';
    return 'Plain Text';
  };

  return (
    <footer className="h-[22px] bg-vscode-statusBar border-t border-vscode-border flex justify-between items-center px-3 text-[10px] text-vscode-muted font-mono select-none flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranch size={11} />
          <span>main</span>
        </div>
        <div className="hidden sm:inline">Bangalore, IN</div>
        <div>{time}</div>
        <div className="hidden sm:inline opacity-30">|</div>
        <div className="hidden sm:inline">© 2026 Subodh. All rights reserved.</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:inline">Ln 1, Col 1</div>
        <div className="hidden md:inline">Spaces: 2</div>
        <div className="hidden md:inline">UTF-8</div>
        <div className="uppercase">{getLanguageMode()}</div>
      </div>
    </footer>
  );
};
