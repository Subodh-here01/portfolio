import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BootScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);

  const bootLogs = [
    "Initializing RIT-ISE OS x86_64...",
    "Mounting /home/subodh/projects...",
    "Loading kernel modules: [react] [vite] [tailwind] [zustand]... OK",
    "Configuring environment variables: PATH=/home/subodh/bin...",
    "Starting subodh-portfolio.dev on port 5500...",
    "Compiling bundles and optimizing assets...",
    "Done compiling in 842ms!"
  ];

  useEffect(() => {
    // Append logs line-by-line
    if (logIndex < bootLogs.length) {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, bootLogs[logIndex]]);
        setLogIndex(logIndex + 1);
      }, 500 + Math.random() * 300);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        handleEndBoot();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [logIndex]);

  // Handle ESC skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleEndBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEndBoot = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-[#030407] text-[#38bdf8] font-mono text-sm flex flex-col justify-between p-12 z-[9999]"
        >
          <div className="flex-grow max-w-[800px] mx-auto w-full leading-8 whitespace-pre-wrap select-text">
            {logs.map((log, idx) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={idx}
                className="mb-2"
              >
                {log}
              </motion.div>
            ))}
            {logIndex < bootLogs.length && (
              <span className="inline-block w-2 h-4 bg-sky-400 animate-pulse ml-1">_</span>
            )}
          </div>

          <button
            onClick={handleEndBoot}
            className="self-center mt-8 px-5 py-2 rounded-full bg-white/5 text-xs text-vscode-muted hover:bg-white/10 hover:text-vscode-text hover:border-vscode-accent border border-vscode-border transition-all cursor-pointer"
          >
            Skip Boot [ESC]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
