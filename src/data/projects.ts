export interface Project {
  id: string;
  name: string;
  tag: string;
  description: string;
  stack: string[];
  github: string;
  live?: string;
}

export const projectsData: Project[] = [
  {
    id: "codemeet",
    name: "CodeMeet",
    tag: "collaboration",
    description: "Real-time collaborative coding platform with room-scoped access control, sub-100ms code synchronization via Socket.io, and peer-to-peer audio/video streaming via WebRTC.",
    stack: ["React", "Node.js", "Socket.io", "WebRTC"],
    github: "https://github.com/Subodh-here01/codemeet",
    live: "https://codemeet-live.example.com"
  },
  {
    id: "secure-vault",
    name: "Secure Vault",
    tag: "security",
    description: "Secure credential and secret management vault implementing AES-256 cryptographic encryption protocols, user authentication hashing, and protected database storage.",
    stack: ["Python", "Cryptography", "SQLite"],
    github: "https://github.com/Subodh-here01/secure-vault",
    live: "#"
  },
  {
    id: "crime360",
    name: "Crime360",
    tag: "hackathon",
    description: "Centralized security portal and crime tracking system designed and implemented as a hackathon project submission.",
    stack: ["TypeScript", "React", "Node.js"],
    github: "https://github.com/Subodh-here01/crime360",
    live: "#"
  },
  {
    id: "mini-crm",
    name: "Mini CRM",
    tag: "systems",
    description: "Customer Relationship Management system built to manage users, tracks leads pipelines, and coordinates contact interactions.",
    stack: ["TypeScript", "Express", "Node.js"],
    github: "https://github.com/Subodh-here01/MINI-CRM"
  },
  {
    id: "task-manager",
    name: "Task Manager",
    tag: "utilities",
    description: "Interactively tracks progress workflows and manages projects with persistent client-side task logs.",
    stack: ["JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/Subodh-here01/task_manager"
  }
];
