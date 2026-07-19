import React from 'react';

export const TitleBar: React.FC = () => {
  return (
    <header className="h-8 bg-vscode-activityBar border-b border-vscode-border flex items-center justify-between px-3 select-none flex-shrink-0 text-xs text-vscode-muted font-sans">
      {/* Traffic light dots */}
      <div className="flex gap-1.5 items-center w-24">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-75"></span>
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-75"></span>
        <span className="w-3 h-3 rounded-full bg-[#27c93f] opacity-75"></span>
      </div>
      
      {/* Centered Title */}
      <div className="flex-grow text-center font-medium truncate">
        subodh-portfolio — Visual Studio Code
      </div>
      
      {/* Decorative Right Spacer */}
      <div className="w-24 flex justify-end gap-3 opacity-60">
        <span>⌥</span>
        <span>⌘</span>
      </div>
    </header>
  );
};
