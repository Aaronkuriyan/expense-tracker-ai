/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can add your Notion colors here as permanent variables if you like
      colors: {
        notion: {
          bg: '#191919',
          border: '#2f2f2f',
          text: '#9b9b9b',
        }
      }
    },
  },
  plugins: [],
}