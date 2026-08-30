/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#050505",
        bgSecondary: "#0A0A0A",
        bgCard: "#0D0D0D",
        textPrimary: "#F5F5F5",
        textSecondary: "#8A8A8A",
        accentPrimary: "#8B5CF6",
        accentSecondary: "#38BDF8",
        success: "#39FF88",
        termGreen: "#39FF88",
        // Semantic references
        primary: "#8B5CF6",
        secondary: "#38BDF8",
        dark: "#0A0A0A",
        darker: "#050505",
        card: "#0D0D0D",
        cardBorder: "rgba(255, 255, 255, 0.08)",
        main: "#F5F5F5",
        muted: "#8A8A8A",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'terminal-cursor': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        'terminal': '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-hover': '0 12px 30px -10px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(139, 92, 246, 0.25)',
      },
    },
  },
  plugins: [],
}
