/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/daisyui/dist/**/*.js',
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/user/**/*.{js,ts,jsx,tsx}, ./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "custom-border": "#30363d",
        "custom-bg": "#0a0a0a",
        "light-font": "#888888",
        "nav-text": "rgba(255, 255, 255, 0.50)",
        "card-text": "rgba(255, 255, 255, 0.75)",
        "cardsColor": "#171A1A",
        "gradient-bg": "linear-gradient(270deg,#8D41AA 0%,#BA356C 17.71%,#F22C30 42.19%,#F8573A 71.88%,#FCBB57 100%)",
        "filter": "#d9d9d9",
        "cardsHover": "#252928"
      },

      fontFamily: {
        'mainPageText': ['Outfit', 'sans-serif'],
      },
      keyframes: {
        gradientChange: {
          '0%': {
            background: '#191919',
          },
          '100%': {
            background: 'radial-gradient(circle at top left,#8d41aa 0%,#ba356c 34.38%,#f22c30 60.94%,#f8573a 79.69%,#fcbb57 100%)',
          },
        }
      },
      animation: {
        'bg-gradient': 'gradientChange 0.15s ease-in-out forwards'
      }
    },
    darkMode: "class",
    plugins: [
      require("daisyui"),
      require('flowbite/plugin')({
        charts: true,
      }),
      require("tw-elements-react/dist/plugin.cjs")
    ],
  }
};
