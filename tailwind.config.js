/** @type {import('tailwindcss').Config} */export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",], theme: {
        extend: { colors: { primary: { DEFAULT: '#e94560', dark: '#1a1a2e', light: '#f97316', }, secondary: { DEFAULT: '#16213e', light: '#e8dfd8', } }, backgroundImage: { 'gradient-primary': 'linear-gradient(135deg, #e94560 0%, #f97316 100%)', 'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', }, keyframes: { fadeIn: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' }, }, }, animation: { fadeIn: 'fadeIn 0.6s ease', }, },
    },
    plugins: [],
}
