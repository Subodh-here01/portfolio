import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { projectsData } from '../data/projects';
import { experienceData, educationData, certificationsData, hackathonsData } from '../data/experience';
import { skillsData } from '../data/skills';
import { Code, Cpu, Database, BookOpen, Download, Mail, Award } from 'lucide-react';

export const EditorPane: React.FC = () => {
  const { activeTabId, accentColor, setAccentColor, reducedMotion, setReducedMotion } = useStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Image Fallback State Loader
  const [imgSrc, setImgSrc] = useState('src/assets/subodh.png');

  // Text Scramble Loop State
  const phrases = [
    'Builds webapps & automations',
    'software tester',
    'competitive programmer',
    'chess player',
    'cricket player'
  ];
  const [scrambleText, setScrambleText] = useState(phrases[0]);
  const textRef = useRef(phrases[0]);

  useEffect(() => {
    let phraseIdx = 0;
    const chars = '!<>-_\\/[]{}—=+*^?#';
    let frameRequest: number;
    let isMounted = true;

    const scramble = (targetText: string) => {
      let frame = 0;
      const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
      const oldText = textRef.current;
      const length = Math.max(oldText.length, targetText.length);

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = targetText[i] || '';
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        queue.push({ from, to, start, end });
      }

      const update = () => {
        if (!isMounted) return;
        let output = '';
        let complete = 0;
        for (let i = 0; i < queue.length; i++) {
          let { from, to, start, end, char } = queue[i];
          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = chars[Math.floor(Math.random() * chars.length)];
              queue[i].char = char;
            }
            output += char;
          } else {
            output += from;
          }
        }

        textRef.current = output;
        setScrambleText(output);

        if (complete < queue.length) {
          frame++;
          frameRequest = requestAnimationFrame(update);
        }
      };

      frameRequest = requestAnimationFrame(update);
    };

    const interval = setInterval(() => {
      phraseIdx = (phraseIdx + 1) % phrases.length;
      scramble(phrases[phraseIdx]);
    }, 3200);

    return () => {
      isMounted = false;
      clearInterval(interval);
      cancelAnimationFrame(frameRequest);
    };
  }, []);

  if (!activeTabId) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center font-mono text-vscode-muted p-12 text-center select-none">
        <div className="text-3xl opacity-20 mb-4">💻</div>
        <div className="text-sm font-semibold mb-2">No Editor Open</div>
        <div className="text-xs opacity-60 flex flex-col gap-2">
          <div>Press <kbd className="bg-vscode-activityBar px-1.5 py-0.5 rounded border border-vscode-border">Ctrl + K</kbd> to open Command Palette</div>
          <div>Or select a file from the explorer sidebar tree</div>
        </div>
      </div>
    );
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subodh is informed! Name: ${formData.name}, Email: ${formData.email}.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar">

      {/* 1. INDEX.HTML (ABOUT ME) */}
      {activeTabId === '/index.html' && (
        <article className="max-w-[1000px] w-full leading-7 font-sans flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          <div className="flex-grow">
            <div className="font-mono text-[11px] text-vscode-muted mb-4">// line info blame: subodh, 3 days ago · initial commit</div>
            <h1 className="text-3xl font-mono mb-2 flex items-baseline gap-3">
              <span className="text-vscode-accent">&lt;</span>Subodh<span className="text-vscode-accent">/&gt;</span>
            </h1>
            <h3 className="text-sm font-mono text-vscode-muted tracking-wider uppercase mb-6 flex flex-wrap items-center gap-2">
              Final Year ISE @ RIT Bangalore · <span className="text-[var(--accent)] font-semibold lowercase font-mono">{scrambleText}</span>
              <span className="clean-status-cursor"></span>
            </h3>

            <div className="text-vscode-muted text-sm space-y-4">
              <p>
                I am a final-year Information Science student at RIT Bangalore. I build web applications, automations,
                experiment with machine learning models, and compete in programming contests. I have shipped a production
                WhatsApp automation system handling concurrent loads and built real-time collaborative platforms.
                Currently, I am focused on backend systems and optimizing performance under pressure.
              </p>
              <p>
                This entire portfolio operates as a fully reactive simulation of Visual Studio Code. Feel free to explore
                the file structure in the sidebar, search for files, inspect extensions, or boot up the bottom command line terminal.
              </p>
            </div>

            {/* Resume & Core Links */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href="https://drive.google.com/file/d/1pXsnNpI_7c_3insvEPzyiX5mWF2PtG6e/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--accent)] via-indigo-500 to-purple-500 animate-border-flow text-vscode-bg font-semibold font-sans rounded-lg shadow-lg hover:shadow-[0_0_15px_var(--accent)] hover:opacity-90 transition-all cursor-pointer text-xs"
              >
                <Download size={14} />
                <span>Download Resume</span>
              </a>
              <div className="flex gap-2">
                <a
                  href="https://github.com/Subodh-here01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-vscode-activityBar border border-vscode-border hover:border-[var(--accent)] rounded-lg text-vscode-muted hover:text-vscode-text transition-all"
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/subodh2106/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-vscode-activityBar border border-vscode-border hover:border-[var(--accent)] rounded-lg text-vscode-muted hover:text-vscode-text transition-all"
                  title="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a
                  href="mailto:ssubodhskd26@gmail.com"
                  className="p-2 bg-vscode-activityBar border border-vscode-border hover:border-[var(--accent)] rounded-lg text-vscode-muted hover:text-vscode-text transition-all"
                  title="Email"
                >
                  <Mail size={15} />
                </a>
              </div>
            </div>

          </div>
          <div className="flex-shrink-0 mt-8 md:mt-0">
            {/* Fancy Glow Outer Border Panel */}
            <div className="p-1 bg-gradient-to-tr from-[var(--accent)] via-indigo-500 to-purple-600 animate-border-flow rounded-3xl shadow-[0_0_30px_rgba(79,142,247,0.25)] hover:shadow-[0_0_40px_rgba(79,142,247,0.4)] transition-all duration-500">
              <div className="relative w-56 h-56 rounded-2xl overflow-hidden bg-vscode-sidebar/95 border border-white/5">
                <img
                  src={imgSrc}
                  alt="Subodh Profile"
                  className="w-full h-full object-cover"
                  onError={() => {
                    if (imgSrc === 'src/assets/subodh.png') {
                      setImgSrc('src/assets/hero.jpeg');
                    } else if (imgSrc === 'src/assets/hero.jpeg') {
                      setImgSrc('src/assets/hero.png');
                    } else {
                      setImgSrc('https://api.dicebear.com/7.x/bottts/svg?seed=subodh');
                    }
                  }}
                />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-[9px] font-sans font-semibold text-white/90 tracking-wide uppercase select-none pointer-events-none">
                  Enhanced with AI
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* 2. PROJECTS.JSON (PROJECTS MATRIX) */}
      {activeTabId === '/projects.json' && (
        <div className="max-w-[1000px] font-mono text-xs">
          <div className="text-vscode-muted mb-4 hidden md:block">// projects.json - editable config data</div>
          <div className="text-vscode-accent mb-2 hidden md:block">{"{"}</div>
          <div className="pl-0 md:pl-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="hidden md:block">
                <span className="text-[#9cdcfe]">"projects"</span>: [
              </div>
              <div className="pl-0 md:pl-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {projectsData.map((project) => (
                  <div
                    key={project.id}
                    className="border border-vscode-border bg-vscode-sidebar/50 rounded-lg p-4 md:p-5 flex flex-col justify-between hover:border-[var(--accent)] hover:shadow-lg transition-all"
                  >
                    <div>
                      <div className="flex flex-wrap justify-between items-center gap-1 mb-2">
                        <span className="text-vscode-muted text-[10px] uppercase tracking-wider">{project.tag}</span>
                        <span className="text-vscode-accent text-[10px]">{project.id}.json</span>
                      </div>
                      <h3 className="text-sm font-semibold text-vscode-text mb-2">{project.name}</h3>
                      <p className="text-vscode-muted text-[11px] leading-relaxed mb-4">{project.description}</p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.stack.map(s => (
                          <span key={s} className="bg-vscode-activityBar border border-vscode-border rounded text-[9px] px-1.5 py-0.5 text-vscode-muted">{s}</span>
                        ))}
                      </div>
                      <div className="flex gap-3 text-[10px] font-semibold">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-vscode-accent hover:underline">GitHub ↗</a>
                        {project.live && project.live !== '#' && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-vscode-text hover:underline">Live Demo ↗</a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <span className="mt-2 text-vscode-text hidden md:inline">]</span>
            </div>
          </div>
          <div className="text-vscode-accent mt-2 hidden md:block">{"}"}</div>
        </div>
      )}

      {/* 3. EXPERIENCE.YAML (YAML TIMELINE) */}
      {activeTabId === '/experience.yaml' && (
        <div className="max-w-[800px] font-mono text-xs leading-6">
          <div className="text-vscode-muted mb-4"># experience.yaml - milestones</div>

          <div className="mb-6">
            <span className="text-vscode-accent">experience:</span>
            {experienceData.map((exp, idx) => (
              <div key={idx} className="pl-4 mt-2 border-l border-vscode-border ml-2">
                <div><span className="text-[#9cdcfe]">- role:</span> <span className="text-[#ce9178]">"{exp.role}"</span></div>
                <div><span className="text-[#9cdcfe]">  company:</span> <span className="text-[#ce9178]">"{exp.company}"</span></div>
                <div><span className="text-[#9cdcfe]">  period:</span> <span className="text-[#ce9178]">"{exp.period}"</span></div>
                <div><span className="text-[#9cdcfe]">  details:</span> <span className="text-vscode-muted">"{exp.details}"</span></div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <span className="text-vscode-accent">skills:</span>
            {skillsData.map((skill, idx) => (
              <div key={idx} className="pl-4 mt-2 border-l border-vscode-border ml-2">
                <div><span className="text-[#9cdcfe]">- category:</span> <span className="text-[#ce9178]">"{skill.category}"</span></div>
                <div><span className="text-[#9cdcfe]">  values:</span> <span className="text-vscode-muted">[{skill.skills.join(', ')}]</span></div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <span className="text-vscode-accent">certifications:</span>
            {certificationsData.map((cert, idx) => (
              <div key={idx} className="pl-4 mt-2 border-l border-vscode-border ml-2">
                <div><span className="text-[#9cdcfe]">- name:</span> <span className="text-[#ce9178]">"{cert.name}"</span></div>
                <div><span className="text-[#9cdcfe]">  issuer:</span> <span className="text-vscode-muted">"{cert.issuer}"</span></div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <span className="text-vscode-accent">hackathons:</span>
            {hackathonsData.map((hack, idx) => (
              <div key={idx} className="pl-4 mt-2 border-l border-vscode-border ml-2">
                <div><span className="text-[#9cdcfe]">- name:</span> <span className="text-[#ce9178]">"{hack.name}"</span></div>
                <div><span className="text-[#9cdcfe]">  role:</span> <span className="text-vscode-muted">"{hack.issuer}"</span></div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <span className="text-vscode-accent">education:</span>
            {educationData.map((edu, idx) => (
              <div key={idx} className="pl-4 mt-2 border-l border-vscode-border ml-2">
                <div><span className="text-[#9cdcfe]">- degree:</span> <span className="text-[#ce9178]">"{edu.degree}"</span></div>
                <div><span className="text-[#9cdcfe]">  institution:</span> <span className="text-[#ce9178]">"{edu.institution}"</span></div>
                <div><span className="text-[#9cdcfe]">  period:</span> <span className="text-[#ce9178]">"{edu.period}"</span></div>
              </div>
            ))}
          </div>

          {/* Graphic Skills Panels Grid */}
          <div className="mt-8 pt-6 border-t border-vscode-border">
            <div className="text-sm font-semibold text-vscode-text mb-4 uppercase tracking-wider font-sans">Skills Matrix</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              {skillsData.map((cat, idx) => {
                const iconsMap = [
                  <Code size={16} className="text-vscode-accent" />,
                  <Cpu size={16} className="text-vscode-accent" />,
                  <Database size={16} className="text-vscode-accent" />,
                  <BookOpen size={16} className="text-vscode-accent" />
                ];
                return (
                  <div key={idx} className="border border-vscode-border bg-vscode-sidebar/20 rounded-lg p-4 hover:border-[var(--accent)] transition-colors">
                    <div className="flex items-center gap-2 mb-3 text-vscode-text font-semibold text-xs uppercase tracking-wider">
                      {iconsMap[idx] || <Code size={16} />}
                      <span>{cat.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <span key={s} className="bg-vscode-activityBar border border-vscode-border rounded text-[10px] px-2 py-0.5 text-vscode-muted font-mono">{s}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Graphic Certifications Matrix */}
          <div className="mt-8 pt-6 border-t border-vscode-border">
            <div className="text-sm font-semibold text-vscode-text mb-4 uppercase tracking-wider font-sans">Certifications & Hackathons</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              {/* Certs List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-vscode-muted tracking-wider uppercase mb-1">Professional Certifications</div>
                {certificationsData.map((cert, idx) => (
                  <div key={idx} className="border border-vscode-border bg-vscode-sidebar/20 rounded-lg p-3.5 hover:border-[var(--accent)] transition-all">
                    <div className="flex items-start gap-2">
                      <Award size={16} className="text-vscode-accent flex-shrink-0 mt-0.5" />
                      <div className="flex-grow">
                        <div className="text-vscode-text font-semibold text-[11px] leading-tight">{cert.name}</div>
                        <div className="text-[10px] text-vscode-muted mt-1">{cert.issuer}</div>
                      </div>
                      <button
                        onClick={() => alert(`Redirecting to view: ${cert.name}`)}
                        className="text-[10px] text-vscode-accent hover:underline cursor-pointer flex-shrink-0 font-mono"
                      >
                        [view ↗]
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hackathons List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-vscode-muted tracking-wider uppercase mb-1">Hackathons & Competitions</div>
                {hackathonsData.map((hack, idx) => (
                  <div key={idx} className="border border-vscode-border bg-vscode-sidebar/20 rounded-lg p-3.5 hover:border-[var(--accent)] transition-all">
                    <div className="flex items-start gap-2">
                      <Award size={16} className="text-vscode-accent flex-shrink-0 mt-0.5" />
                      <div className="flex-grow">
                        <div className="text-vscode-text font-semibold text-[11px] leading-tight">{hack.name}</div>
                        <div className="text-[10px] text-vscode-muted mt-1">{hack.issuer}</div>
                      </div>
                      <button
                        onClick={() => alert(`Redirecting to view: ${hack.name}`)}
                        className="text-[10px] text-vscode-accent hover:underline cursor-pointer flex-shrink-0 font-mono"
                      >
                        [view ↗]
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CP.JAVA (COMPETITIVE METRICS) */}
      {activeTabId === '/cp.java' && (
        <div className="max-w-[800px] font-mono text-xs leading-5">
          <div className="text-vscode-muted mb-4">// cp.java - Segment Tree templates for range query limits</div>
          <div><span className="text-[#569cd6]">import</span> java.io.*;</div>
          <div><span className="text-[#569cd6]">import</span> java.util.*;</div>
          <br />
          <div><span className="text-[#569cd6]">public class</span> <span className="text-[#4ec9b0]">SegmentTree</span> {"{"}</div>
          <div className="pl-4">
            <div><span className="text-[#569cd6]">int</span>[] <span className="text-[#9cdcfe]">tree</span>;</div>
            <div><span className="text-[#569cd6]">int</span> <span className="text-[#9cdcfe]">n</span>;</div>
            <br />
            <div><span className="text-[#569cd6]">public</span> <span className="text-[#dcdcaa]">SegmentTree</span>(<span className="text-[#569cd6]">int</span>[] arr) {"{"}</div>
            <div className="pl-4">
              <div>n = arr.length;</div>
              <div>tree = <span className="text-[#569cd6]">new int</span>[4 * n];</div>
              <div>build(arr, 0, 0, n - 1);</div>
            </div>
            <div>{"}"}</div>
            <br />
            <div><span className="text-[#569cd6]">private void</span> <span className="text-[#dcdcaa]">build</span>(<span className="text-[#569cd6]">int</span>[] arr, <span className="text-[#569cd6]">int</span> node, <span className="text-[#569cd6]">int</span> start, <span className="text-[#569cd6]">int</span> end) {"{"}</div>
            <div className="pl-4">
              <div><span className="text-[#569cd6]">if</span> (start == end) {"{"}</div>
              <div className="pl-4">tree[node] = arr[start];</div>
              <div className="pl-4"><span className="text-[#569cd6]">return</span>;</div>
              <div>{"}"}</div>
              <div><span className="text-[#569cd6]">int</span> mid = (start + end) / 2;</div>
              <div>build(arr, 2 * node + 1, start, mid);</div>
              <div>build(arr, 2 * node + 2, mid + 1, end);</div>
              <div>tree[node] = Math.min(tree[2 * node + 1], tree[2 * node + 2]);</div>
            </div>
            <div>{"}"}</div>
            <br />
            <div><span className="text-[#569cd6]">public int</span> <span className="text-[#dcdcaa]">query</span>(<span className="text-[#569cd6]">int</span> l, <span className="text-[#569cd6]">int</span> r) {"{"}</div>
            <div className="pl-4">
              <div><span className="text-[#569cd6]">return</span> query(0, 0, n - 1, l, r);</div>
            </div>
            <div>{"}"}</div>
            <br />
            <div><span className="text-[#569cd6]">private int</span> <span className="text-[#dcdcaa]">query</span>(<span className="text-[#569cd6]">int</span> node, <span className="text-[#569cd6]">int</span> start, <span className="text-[#569cd6]">int</span> end, <span className="text-[#569cd6]">int</span> l, <span className="text-[#569cd6]">int</span> r) {"{"}</div>
            <div className="pl-4">
              <div><span className="text-[#569cd6]">if</span> (r &lt; start || end &lt; l) <span className="text-[#569cd6]">return</span> Integer.MAX_VALUE;</div>
              <div><span className="text-[#569cd6]">if</span> (l &lt;= start && end &lt;= r) <span className="text-[#569cd6]">return</span> tree[node];</div>
              <div><span className="text-[#569cd6]">int</span> mid = (start + end) / 2;</div>
              <div><span className="text-[#569cd6]">return</span> Math.min(query(2 * node + 1, start, mid, l, r), query(2 * node + 2, mid + 1, end, l, r));</div>
            </div>
            <div>{"}"}</div>
          </div>
          <div>{"}"}</div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
            <div className="border border-vscode-border p-4 rounded-lg bg-vscode-sidebar/30">
              <div className="text-vscode-text font-bold mb-1">LeetCode</div>
              <a href="https://leetcode.com/Subodh2106/" target="_blank" rel="noopener noreferrer" className="text-vscode-accent hover:underline text-[10px]">View Profile ↗</a>
            </div>
            <div className="border border-vscode-border p-4 rounded-lg bg-vscode-sidebar/30">
              <div className="text-vscode-text font-bold mb-1">Codeforces</div>
              <a href="https://codeforces.com/profile/subodh26" target="_blank" rel="noopener noreferrer" className="text-vscode-accent hover:underline text-[10px]">View Profile ↗</a>
            </div>
            <div className="border border-vscode-border p-4 rounded-lg bg-vscode-sidebar/30">
              <div className="text-vscode-text font-bold mb-1">HackerRank</div>
              <a href="https://www.hackerrank.com/profile/datavore" target="_blank" rel="noopener noreferrer" className="text-vscode-accent hover:underline text-[10px]">View Profile ↗</a>
            </div>
          </div>
        </div>
      )}

      {/* 5. CONTACT.MD (CONTACT FORM) */}
      {activeTabId === '/contact.md' && (
        <div className="max-w-[600px] font-sans">
          <div className="font-mono text-xs text-vscode-muted mb-4"># contact.md</div>
          <h2 className="text-xl font-mono font-semibold text-vscode-text mb-6">Contact for Collaborations</h2>

          <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
            <div className="flex flex-col gap-1.5">
              <label className="text-vscode-muted uppercase tracking-wider">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ada Lovelace"
                className="bg-vscode-activityBar border border-vscode-border rounded p-2.5 text-vscode-text outline-none focus:border-vscode-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-vscode-muted uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. ada@lovelace.org"
                className="bg-vscode-activityBar border border-vscode-border rounded p-2.5 text-vscode-text outline-none focus:border-vscode-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-vscode-muted uppercase tracking-wider">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's build something collaborative..."
                className="bg-vscode-activityBar border border-vscode-border rounded p-2.5 text-vscode-text outline-none min-height-[120px] focus:border-vscode-accent transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded bg-vscode-activityBar hover:bg-white/5 border border-vscode-border hover:border-vscode-accent text-vscode-text cursor-pointer transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      )}

      {/* 6. SETTINGS.JSON (INTERACTIVE CONFIG) */}
      {activeTabId === '/settings.json' && (
        <div className="max-w-[700px] font-mono text-xs leading-6">
          <div className="text-vscode-muted mb-4">// settings.json - toggle options</div>
          <div>{"{"}</div>
          <div className="pl-6">
            <div>
              <span className="text-[#9cdcfe]">"workspace.theme"</span>:
              <span className="text-vscode-muted pl-2">// click to cycle settings</span>
              <button
                onClick={() => {
                  const options = ['blue', 'green', 'amber', 'purple'];
                  const nextIdx = (options.indexOf(accentColor) + 1) % options.length;
                  setAccentColor(options[nextIdx]);
                }}
                className="bg-white/5 hover:bg-white/10 px-2 py-0.5 border border-vscode-border rounded text-[var(--accent)] font-semibold ml-2 cursor-pointer transition-colors"
              >
                "{accentColor}"
              </button>
            </div>

            <div className="mt-2">
              <span className="text-[#9cdcfe]">"workspace.reducedMotion"</span>:
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className="bg-white/5 hover:bg-white/10 px-2 py-0.5 border border-vscode-border rounded text-vscode-accent font-semibold ml-2 cursor-pointer transition-colors"
              >
                {reducedMotion ? "true" : "false"}
              </button>
            </div>
          </div>
          <div>{"}"}</div>
        </div>
      )}

    </div>
  );
};
