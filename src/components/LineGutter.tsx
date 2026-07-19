import React from 'react';
import { useStore } from '../store/useStore';

export const LineGutter: React.FC = () => {
  const { activeTabId } = useStore();

  if (!activeTabId) return null;

  // Let's generate a static list of numbers
  const lines = Array.from({ length: 45 }, (_, i) => i + 1);

  return (
    <div className="w-11 border-r border-vscode-border py-8 text-right pr-3.5 text-white/15 font-mono text-xs select-none leading-7 bg-vscode-activityBar/5 flex-shrink-0 hidden md:block">
      {lines.map((num) => (
        <div key={num}>{num}</div>
      ))}
    </div>
  );
};
