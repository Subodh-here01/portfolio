import { useEffect } from 'react';
import { TitleBar } from './components/TitleBar';
import { ActivityBar } from './components/ActivityBar';
import { Sidebar } from './components/Sidebar';
import { EditorTabs } from './components/EditorTabs';
import { LineGutter } from './components/LineGutter';
import { EditorPane } from './components/EditorPane';
import { Minimap } from './components/Minimap';
import { TerminalPanel } from './components/TerminalPanel';
import { StatusBar } from './components/StatusBar';
import { BootScreen } from './components/BootScreen';
import { CommandPalette } from './components/CommandPalette';
import { useStore } from './store/useStore';

function App() {
  const { toggleTerminal, setAccentColor } = useStore();

  // Load saved colors on mount
  useEffect(() => {
    const saved = localStorage.getItem('accent-color') || 'blue';
    setAccentColor(saved);
  }, [setAccentColor]);

  // Global keydown listeners for command console drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~')) {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal]);

  return (
    <>
      {/* 1. System Boot Animations */}
      <BootScreen />

      {/* 2. Fuzzy Search Palette Command Palette Overlay */}
      <CommandPalette />

      {/* 3. Outer Frame Layout Container */}
      <div className="w-screen h-screen p-3 flex flex-col justify-between overflow-hidden relative box-border">
        {/* Pulsating Ambient Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-40">
          <div className="absolute top-[10%] left-[10%] w-[450px] h-[450px] bg-[var(--accent)]/15 rounded-full filter blur-[100px] animate-blob1" />
          <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] bg-purple-500/15 rounded-full filter blur-[100px] animate-blob2" />
        </div>
        
        {/* IDE Window */}
        <div className="flex-grow flex flex-col bg-vscode-editor/80 backdrop-blur-xl border border-vscode-border rounded-xl shadow-2xl overflow-hidden relative">
          {/* Top Title Bar */}
          <TitleBar />

          {/* IDE Split Space */}
          <div className="flex-grow flex overflow-hidden">
            {/* Left Activity Bar */}
            <ActivityBar />

            {/* Collapsible Left Workspace Sidebar */}
            <Sidebar />

            {/* Right Editor Area */}
            <div className="flex-grow flex flex-col overflow-hidden">
              {/* File Navigation Tabs */}
              <EditorTabs />

              {/* Gutter + Code Editor Content Pane + Minimap */}
              <div className="flex-grow flex overflow-hidden relative">
                {/* Gutter Line Numbers */}
                <LineGutter />

                {/* Rendered Syntax Visual Panels */}
                <EditorPane />

                {/* Right Scroll Minimap */}
                <Minimap />
              </div>
            </div>
          </div>

          {/* Collapsible Terminal Panel Drawer */}
          <TerminalPanel />

          {/* bottom Status Bar */}
          <StatusBar />
        </div>
      </div>
    </>
  );
}

export default App;
