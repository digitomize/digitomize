/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/*.{js,ts,jsx,tsx}",
    "./src/user/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-border": "#30363d",
        "custom-bg": "#0a0a0a",
      },
    },
  },
  plugins: [],
};
