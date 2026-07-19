export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Java", "JavaScript", "Python"]
  },
  {
    category: "Frameworks",
    skills: ["React", "Node.js", "Express", "Socket.io", "WebRTC", "TensorFlow", "Tailwind CSS"]
  },
  {
    category: "Databases & Tools",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Git", "Docker", "Postman", "REST APIs", "n8n"]
  },
  {
    category: "Concepts",
    skills: ["Data Structures & Algorithms", "System Design", "Computer Networks", "Operating Systems", "Agile/Iterative Development"]
  }
];
