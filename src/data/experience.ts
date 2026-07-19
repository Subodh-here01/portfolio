export interface JobExperience {
  role: string;
  company: string;
  period: string;
  stack: string[];
  details: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Hackathon {
  name: string;
  issuer: string;
}

export const experienceData: JobExperience[] = [
  {
    role: "Software Developer Intern",
    company: "Vega Visionary",
    period: "Jul 2026",
    stack: ["n8n", "Supabase", "Meta Cloud API", "LLMs"],
    details: "Built a WhatsApp chatbot automation system handling large concurrent user loads. Integrated LLM workflows via n8n, used Supabase as the backend database, and connected Meta Cloud API for message routing and delivery."
  }
];

export const educationData: Education[] = [
  {
    institution: "Ramaiah Institute of Technology, Bangalore",
    degree: "B.E. Information Science & Engineering",
    period: "2023 – 2027"
  }
];

export const certificationsData: Certification[] = [
  {
    name: "AI Concepts and Techniques",
    issuer: "NPTEL"
  },
  {
    name: "AWS Workshop & Hands-on Experience",
    issuer: "MSRIT, Bangalore"
  },
  {
    name: "Building a Cognitive Vision App in Azure",
    issuer: "Microsoft Azure"
  }
];

export const hackathonsData: Hackathon[] = [
  {
    name: "Codecrafter National Coding Competition 2026",
    issuer: "Participant"
  },
  {
    name: "Bhartiya Antariksh Hackathon 2025",
    issuer: "Participant"
  },
  {
    name: "Whackiest 2024",
    issuer: "Participant"
  },
  {
    name: "Sage UI/UX Hackathon 2024",
    issuer: "Participant"
  }
];
