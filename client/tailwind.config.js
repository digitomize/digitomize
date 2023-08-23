/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/components/*.{js,ts,jsx,tsx}", "./src/user/**/*.{js,ts,jsx,tsx}",'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors: {
          cardsColor:'#191919',
     
    },
  },
  plugins: [

    require('flowbite/plugin')({
      charts: true,
  }),
    ],
}};
