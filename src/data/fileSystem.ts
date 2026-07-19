export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  icon?: string;
  path: string;
  children?: FileSystemNode[];
}

export const virtualFileSystem: FileSystemNode = {
  name: "subodh-portfolio",
  type: "directory",
  path: "/",
  children: [
    {
      name: "index.html",
      type: "file",
      icon: "📄",
      path: "/index.html"
    },
    {
      name: "projects.json",
      type: "file",
      icon: "📄",
      path: "/projects.json"
    },
    {
      name: "experience.yaml",
      type: "file",
      icon: "yaml",
      path: "/experience.yaml"
    },
    {
      name: "cp.java",
      type: "file",
      icon: "java",
      path: "/cp.java"
    },
    {
      name: "contact.md",
      type: "file",
      icon: "md",
      path: "/contact.md"
    },
    {
      name: "settings.json",
      type: "file",
      icon: "📄",
      path: "/settings.json"
    }
  ]
};
