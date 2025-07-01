/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        neon: {
          blue: '#00f5ff',
          purple: '#bf00ff',
          pink: '#ff0080',
          green: '#00ff41',
          orange: '#ff8c00',
        },
        cosmic: {
          dark: '#0a0a0f',
          darker: '#050507',
          purple: '#1a0b2e',
          blue: '#16213e',
          navy: '#0f172a',
        }
      },
      fontFamily: {
        'space': ['Orbitron', 'monospace'],
        'futura': ['Futura', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rotate-slow': 'rotate 20s linear infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spin-reverse 6s linear infinite',
        'particles-float': 'particles-float 20s linear infinite',
        'text-flicker': 'text-flicker 4s ease-in-out infinite',
        'pulse-intense': 'pulse-intense 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 15px #00f5ff' },
          '100%': { boxShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'spin-reverse': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        'particles-float': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-200px, -100px)' },
        },
        'text-flicker': {
          '0%, 100%': { opacity: 1 },
          '98%': { opacity: 1 },
          '99%': { opacity: 0.98 },
          '99.5%': { opacity: 1 },
        },
        'pulse-intense': {
          '0%, 100%': {
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor'
          },
          '50%': {
            boxShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor, 0 0 60px currentColor'
          },
        }
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #16213e 100%)',
        'nebula': 'radial-gradient(ellipse at center, rgba(191, 0, 255, 0.3) 0%, rgba(0, 245, 255, 0.1) 50%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
