/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: "#0d0f17",
          editor: "#0e111a",
          sidebar: "#080a10",
          activityBar: "#05060a",
          statusBar: "#05060a",
          border: "rgba(255, 255, 255, 0.08)",
          text: "#f3f4f6",
          muted: "#9ca3af",
          accent: "#4f8ef7"
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
