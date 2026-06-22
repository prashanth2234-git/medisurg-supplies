/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0f6fb6',
        clinical: '#16a085',
        ink: '#102033'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 111, 182, 0.14)'
      }
    }
  },
  plugins: [],
}