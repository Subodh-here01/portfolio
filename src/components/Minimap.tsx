import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export const Minimap: React.FC = () => {
  const { activeTabId } = useStore();
  const minimapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editorBody = document.querySelector('.custom-scrollbar');
    if (!editorBody || !minimapRef.current) return;

    const viewportIndicator = minimapRef.current.querySelector('.minimap-viewport') as HTMLDivElement;

    const handleScroll = () => {
      const scrollRatio = editorBody.scrollTop / (editorBody.scrollHeight - editorBody.clientHeight);
      const maxTop = minimapRef.current!.clientHeight - (viewportIndicator?.clientHeight || 0);
      if (viewportIndicator) {
        viewportIndicator.style.top = `${scrollRatio * maxTop || 0}px`;
      }
    };

    editorBody.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      editorBody.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeTabId]);

  if (!activeTabId) return null;

  const handleMinimapClick = (e: React.MouseEvent) => {
    const editorBody = document.querySelector('.custom-scrollbar');
    if (!editorBody || !minimapRef.current) return;

    const rect = minimapRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const clickRatio = clickY / rect.height;
    
    editorBody.scrollTop = clickRatio * (editorBody.scrollHeight - editorBody.clientHeight);
  };

  return (
    <div 
      ref={minimapRef}
      onClick={handleMinimapClick}
      className="w-14 border-l border-vscode-border bg-vscode-sidebar/10 relative overflow-hidden flex-shrink-0 select-none hidden lg:block cursor-pointer"
    >
      {/* Viewport tracking frame */}
      <div 
        className="minimap-viewport absolute left-0 right-0 h-10 bg-white/2 border-t border-b border-white/5 pointer-events-none transition-all"
        style={{ top: '0px' }}
      />
      
      {/* Mini silhouettes representing text rows */}
      <div className="p-3 opacity-20 flex flex-col gap-1.5 pointer-events-none scale-75 origin-top-left">
        <div className="w-8 h-1 bg-[var(--accent)] rounded-sm" />
        <div className="w-10 h-0.5 bg-vscode-muted rounded-sm" />
        <div className="w-9 h-0.5 bg-vscode-muted rounded-sm" />
        <div className="w-11 h-0.5 bg-vscode-muted rounded-sm" />
        <div className="w-6 h-0.5 bg-vscode-muted rounded-sm" />
        <div className="w-8 h-1 bg-[var(--accent)] rounded-sm mt-3" />
        <div className="w-10 h-0.5 bg-vscode-muted rounded-sm" />
        <div className="w-12 h-0.5 bg-vscode-muted rounded-sm" />
        <div className="w-7 h-0.5 bg-vscode-muted rounded-sm" />
      </div>
    </div>
  );
};
