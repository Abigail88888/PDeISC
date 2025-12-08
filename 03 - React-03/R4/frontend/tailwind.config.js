// Creado por mi
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondos estilo código
        'code-bg': {
          primary: '#0d1117',
          secondary: '#161b22',
          tertiary: '#1f2937',
        },
        // Colores de sintaxis
        'syntax': {
          blue: '#58a6ff',
          purple: '#bc8cff',
          green: '#3fb950',
          yellow: '#d29922',
          orange: '#ff7b72',
          pink: '#ff6ec7',
          cyan: '#39c5cf',
        },
        // Estados
        'status': {
          success: '#3fb950',
          error: '#f85149',
          warning: '#d29922',
          info: '#58a6ff',
        },
        // Texto
        'text': {
          primary: '#c9d1d9',
          secondary: '#8b949e',
          muted: '#484f58',
        },
        // Bordes
        'border-code': '#30363d',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(88, 166, 255, 0.4)',
        'glow-purple': '0 0 20px rgba(188, 140, 255, 0.4)',
        'glow-green': '0 0 20px rgba(63, 185, 80, 0.4)',
        'glow-cyan': '0 0 20px rgba(57, 197, 207, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px currentColor)' },
          '50%': { filter: 'drop-shadow(0 0 16px currentColor)' },
        },
      },
    },
  },
  plugins: [],
}