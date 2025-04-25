/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4fa',
          100: '#dbe4f3',
          200: '#bacbe6',
          300: '#91a9d3',
          400: '#6584bd',
          500: '#4766a8',
          600: '#395189',
          700: '#30416f',
          800: '#2b395c',
          900: '#28334f',
          950: '#1a2032',
        },
        accent: {
          50: '#effefb',
          100: '#c7fff6',
          200: '#8ffff0',
          300: '#54f4e4',
          400: '#2de2d2',
          500: '#14c3b7',
          600: '#0d9c96',
          700: '#0f7b79',
          800: '#116162',
          900: '#125152',
          950: '#042f30',
        },
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          900: '#7f1d1d',
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}