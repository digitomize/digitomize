/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/user/**/*.{js,ts,jsx,tsx}, ./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "custom-border": "#30363d",
        "custom-bg": "#0a0a0a",
        "light-font": "#888888",
        "nav-text":"rgba(255, 255, 255, 0.50)",
      },
    
      fontFamily: {
        'mainPageText': ['Outfit', 'sans-serif'],
      },
      colors: {
          cardsColor:'#191919',
     
    },
  },
  darkMode: "class",
  plugins: [

    require('flowbite/plugin')({
      charts: true,
  }),
    require("tw-elements-react/dist/plugin.cjs")],
}};
