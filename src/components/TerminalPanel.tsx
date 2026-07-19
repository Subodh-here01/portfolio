import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../store/useStore';

export const TerminalPanel: React.FC = () => {
  const { terminalOpen, setTerminalOpen, terminalHistory, addTerminalLine, clearTerminal, openFile, closeFile } = useStore();
  const [inputVal, setInputVal] = useState('');
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalOpen, terminalHistory]);

  if (!terminalOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add input command to visual terminal history
    addTerminalLine({ type: 'input', text: trimmed });

    // Store in key command history
    const newHist = [...commandHistory, trimmed];
    setCommandHistory(newHist);
    setHistoryPointer(newHist.length);

    // Parse commands
    const args = trimmed.split(' ');
    const primary = args[0].toLowerCase();
    const arg = args[1];

    const commands: Record<string, () => void> = {
      'help': () => {
        addTerminalLine({
          type: 'output',
          text: `Available commands:
  - whoami          Display profile summary bio
  - ls              List workspace files
  - open <file>     Open a tab for target file (e.g. open index.html)
  - close <file>    Close that tab file
  - cat <file>      Print a file preview in console
  - skills          List tech stack and databases
  - contact         Print contact details and open mail client
  - clear           Clear terminal log screen
  - sudo hire-me    Launch high-clearance Easter egg response`
        });
      },
      'ls': () => {
        addTerminalLine({
          type: 'output',
          text: 'index.html    projects.json    experience.yaml    cp.java    contact.md    settings.json'
        });
      },
      'whoami': () => {
        addTerminalLine({
          type: 'output',
          text: 'Subodh — BE Information Science & Engineering student at RIT Bangalore. Passionate about backend systems, socket-based streaming applications, and automations.'
        });
      },
      'skills': () => {
        addTerminalLine({
          type: 'output',
          text: 'Languages: Java, JavaScript, Python\nFrameworks: React, Express, Socket.io, WebRTC, TensorFlow\nDatabases & Tools: PostgreSQL, MongoDB, Git, Docker, n8n'
        });
      },
      'contact': () => {
        window.open('mailto:ssubodhskd26@gmail.com', '_blank');
        addTerminalLine({
          type: 'output',
          text: 'Opening default mail client to ssubodhskd26@gmail.com...'
        });
      },
      'clear': () => {
        clearTerminal();
      },
      'sudo': () => {
        if (arg === 'hire-me') {
          addTerminalLine({
            type: 'output',
            text: '[sudo] password for subodh: *******\nAccess Granted.\nHiring Sequence Initialized! Subodh is ready to deliver impact.'
          });
        } else {
          addTerminalLine({
            type: 'output',
            text: 'sudo: command not found. Did you mean "sudo hire-me"?'
          });
        }
      }
    };

    if (primary === 'open' && arg) {
      const fileMap: Record<string, { name: string; icon: string }> = {
        'index.html': { name: 'index.html', icon: '📄' },
        'projects.json': { name: 'projects.json', icon: '📄' },
        'experience.yaml': { name: 'experience.yaml', icon: 'yaml' },
        'cp.java': { name: 'cp.java', icon: 'java' },
        'contact.md': { name: 'contact.md', icon: 'md' },
        'settings.json': { name: 'settings.json', icon: '📄' }
      };
      
      const file = fileMap[arg];
      if (file) {
        openFile(`/${arg}`, file.name, file.icon);
        addTerminalLine({ type: 'output', text: `Opened file: ${arg}` });
      } else {
        addTerminalLine({ type: 'output', text: `bash: file not found: ${arg}` });
      }
    } else if (primary === 'close' && arg) {
      closeFile(`/${arg}`);
      addTerminalLine({ type: 'output', text: `Closed tab: ${arg}` });
    } else if (primary === 'cat' && arg) {
      const contents: Record<string, string> = {
        'index.html': '<section>\n  <h1>Subodh</h1>\n  <p>Final year Information Science & Engineering student...</p>\n</section>',
        'projects.json': '{\n  "projects": ["CodeMeet", "Secure Vault", "Crime360"]\n}',
        'experience.yaml': 'experience:\n  - role: Software Developer Intern\n    company: Vega Visionary',
        'cp.java': 'public class SubodhCoding {\n  public static void main(String[] args) {\n    System.out.println("LeetCode: @Subodh2106");\n  }\n}',
        'contact.md': '# Contact Info\nEmail: ssubodhskd26@gmail.com\nLinkedIn: subodh2106',
        'settings.json': '{\n  "workspace.theme": "blue",\n  "workspace.reducedMotion": false\n}'
      };

      if (contents[arg]) {
        addTerminalLine({ type: 'output', text: contents[arg] });
      } else {
        addTerminalLine({ type: 'output', text: `cat: ${arg}: No such file or directory` });
      }
    } else if (commands[primary]) {
      commands[primary]();
    } else {
      addTerminalLine({ type: 'output', text: `bash: command not found: ${primary}. Type 'help' to see list of commands.` });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPtr = historyPointer - 1;
        setHistoryPointer(nextPtr);
        setInputVal(commandHistory[nextPtr]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer < commandHistory.length - 1) {
        const nextPtr = historyPointer + 1;
        setHistoryPointer(nextPtr);
        setInputVal(commandHistory[nextPtr]);
      } else {
        setHistoryPointer(commandHistory.length);
        setInputVal('');
      }
    }
  };

  return (
    <div className="h-48 border-t border-vscode-border bg-vscode-activityBar/95 flex flex-col overflow-hidden select-text flex-shrink-0">
      <div className="bg-vscode-activityBar/50 border-b border-vscode-border px-4 py-1.5 flex justify-between items-center text-[10px] text-vscode-text font-bold font-mono">
        <span>TERMINAL - BASH</span>
        <button 
          onClick={() => setTerminalOpen(false)}
          className="text-vscode-muted hover:text-vscode-text cursor-pointer text-sm"
        >
          ×
        </button>
      </div>

      <div className="flex-grow p-4 overflow-y-auto font-mono text-xs text-vscode-text space-y-2 leading-relaxed custom-scrollbar">
        {terminalHistory.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line.type === 'input' ? (
              <span>
                <span className="text-[#10b981]">subodh@portfolio:~$</span> {line.text}
              </span>
            ) : (
              <span className="text-vscode-muted">{line.text}</span>
            )}
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="text-[#10b981]">subodh@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent border-none outline-none font-mono text-xs text-vscode-text"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
