/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
export default {
  content: [
    "node_modules/daisyui/dist/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/user/**/*.{js,ts,jsx,tsx}, ./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      phonesm: "320px",
      phone: "435px", // Custom screen size for 'phone' below 400px
      sm: "640px", // Default 'sm' screen size
      md: "768px", // Default 'md' screen size
      lg: "1024px", // Default 'lg' screen size
      xl: "1280px", // Default 'xl' screen size
      "2xl": "1536px", // Default '2xl' screen size
    },
    extend: {
      flex: {
        '2': '2 2 0%'
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        caveat: ["Caveat", "cursive"],
        outfit: ["Outfit", "sans-serif"],
        mainPageText: ["myFont", "Outfit", "sans-serif"],
        myFont: ["myFont", "Outfit"],
      },
      colors: {
        "digitomize-bg": "#1584FF",
        paragraph: "#CCCCCC",
        "button-primary": "#1584FF",
        footer: "#131527",
        // description: "#B7B6FF",
        description: "#9eb3bd",
        window: "#3B398F",
        toolbar: "#181757",
        contestlist:
          "linear-gradient(180deg, #101025 0%, rgba(16, 16, 37, 0.46) 100%)",
        contest: "rgba(114, 113, 178, 1)",
        contestborder: "#7271B2",
        contestlogo: "#5D5CBF",
        "button-primary-helper": "#6AB1FF",
        "button-primary-hover": "#0079FF",
        powered: "#D2D2D2",
        badge: "rgba(0, 76, 228, 0.33)",
        badgeborder: "#25478B",
        buttonColor :"#52B55C",
        "badge-txt": "#C3E2FF",
        "custom-border": "#30363d",
        "custom-bg": "#0a0a0a",
        "light-blue": "#9eb3bd",
        "light-font": "#888888",
        "nav-text": "rgba(255, 255, 255, 0.50)",
        "card-text": "rgba(255, 255, 255, 0.75)",
        cardsColor: "#171A1A",
        dashboardColor: "#171A1A",
        dashboardDarkerColor: "RGB(17, 19, 18)",
        "gradient-bg":
          "linear-gradient(270deg,#8D41AA 0%,#BA356C 17.71%,#F22C30 42.19%,#F8573A 71.88%,#FCBB57 100%)",
        filter: "#d9d9d9",
        cardsHover: "#252928",
        "custom-blue": "rgb(21, 132, 255)",
        tagColor: "rgb(136, 136, 136)",
        "eerie-black-1": "hsla(240, 1%, 17%, 0.75);",
        "eerie-black-2": "hsl(240, 2%, 12%)",
        jet: "hsl(0, 0%, 22%)",
        "color-1": "hsla(240, 1%, 18%, 0.51)",
        "color-2": "hsla(240, 2%, 11%, 0.2)",
        "color-3": "hsl(240, 2%, 13%)",
        "gradient-onyx":
          "linear-gradient( to bottom right, hsl(240, 1%, 25%) 3%, hsl(0, 0%, 19%) 97% )",
        "grad-bg": "-webkit-linear-gradient(#eee, #333);",
      },
     backgroundImage:{
          "card-gradient":"linear-gradient(180deg, #12274f 0%, rgba(28, 27, 64, 0.3) 100%)",
        },
      shadowBlack: " hsla(0, 0%, 0%, 0.25);",
      keyframes: {
        gradientChange: {
          "0%": {
            background: "#191919",
          },
          "100%": {
            background: "radial-gradient(circle at top left,#8d41aa 0%,#ba356c 34.38%,#f22c30 60.94%,#f8573a 79.69%,#fcbb57 100%)",
          },
        },
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
      },
      
      animation: {
        "bg-gradient": "gradientChange 0.15s ease-in-out forwards",
        "gradient": "gradient 5s linear infinite",
      },
    },
    darkMode: "class",
    daisyui: {
      themes: [
        {
          mytheme: {
            primary: "#1582ff",
          },
        },
      ],
    },
  },
  plugins: [
    require("daisyui"),
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
