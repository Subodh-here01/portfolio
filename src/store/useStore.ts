import { create } from 'zustand';

export interface Tab {
  id: string;
  name: string;
  path: string;
  icon: string;
}

export type SidebarView = 'explorer' | 'search' | 'git' | 'extensions';

export interface TerminalLine {
  type: 'input' | 'output';
  text: string;
}

interface EditorState {
  openTabs: Tab[];
  activeTabId: string;
  sidebarView: SidebarView;
  sidebarOpen: boolean;
  terminalOpen: boolean;
  terminalHistory: TerminalLine[];
  accentColor: string;
  reducedMotion: boolean;
  
  // Actions
  openFile: (path: string, name: string, icon: string) => void;
  closeFile: (path: string) => void;
  setActiveTab: (path: string) => void;
  setSidebarView: (view: SidebarView) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  setTerminalOpen: (open: boolean) => void;
  addTerminalLine: (line: TerminalLine) => void;
  clearTerminal: () => void;
  setAccentColor: (color: string) => void;
  setReducedMotion: (reduced: boolean) => void;
}

const colors: Record<string, string> = {
  blue: '#4f8ef7',
  green: '#4caf50',
  amber: '#ffb300',
  purple: '#9b51e0'
};

export const useStore = create<EditorState>((set) => ({
  openTabs: [
    { id: '/index.html', name: 'index.html', path: '/index.html', icon: '📄' }
  ],
  activeTabId: '/index.html',
  sidebarView: 'explorer',
  sidebarOpen: true,
  terminalOpen: false,
  terminalHistory: [
    { type: 'output', text: "Welcome to Subodh's Interactive Terminal shell. Type 'help' to see list of commands." }
  ],
  accentColor: localStorage.getItem('accent-color') || 'blue',
  reducedMotion: localStorage.getItem('reduced-motion') === 'true',

  openFile: (path, name, icon) => set((state) => {
    const tabExists = state.openTabs.some((t) => t.path === path);
    const newTabs = tabExists 
      ? state.openTabs 
      : [...state.openTabs, { id: path, name, path, icon }];
    
    return {
      openTabs: newTabs,
      activeTabId: path,
      sidebarOpen: true
    };
  }),

  closeFile: (path) => set((state) => {
    const tabIndex = state.openTabs.findIndex((t) => t.path === path);
    const newTabs = state.openTabs.filter((t) => t.path !== path);
    
    let newActiveId = state.activeTabId;
    if (state.activeTabId === path) {
      if (newTabs.length > 0) {
        // Activate next tab to the left (or right if index was 0)
        const nextIndex = Math.max(0, tabIndex - 1);
        newActiveId = newTabs[nextIndex].path;
      } else {
        newActiveId = '';
      }
    }

    return {
      openTabs: newTabs,
      activeTabId: newActiveId
    };
  }),

  setActiveTab: (path) => set({ activeTabId: path }),
  
  setSidebarView: (view) => set((state) => ({
    sidebarView: view,
    sidebarOpen: state.sidebarView === view && state.sidebarOpen ? false : true
  })),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  
  setTerminalOpen: (open) => set({ terminalOpen: open }),

  addTerminalLine: (line) => set((state) => ({
    terminalHistory: [...state.terminalHistory, line]
  })),

  clearTerminal: () => set({ terminalHistory: [] }),

  setAccentColor: (color) => set(() => {
    const hex = colors[color] || '#4f8ef7';
    document.documentElement.style.setProperty('--accent', hex);
    localStorage.setItem('accent-color', color);
    return { accentColor: color };
  }),

  setReducedMotion: (reduced) => set(() => {
    localStorage.setItem('reduced-motion', reduced ? 'true' : 'false');
    return { reducedMotion: reduced };
  })
}));
