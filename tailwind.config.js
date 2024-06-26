const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'x-primary': '#ff8964',
      },
    },
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#ff8964",
          },
          secondary: {
            foreground: "#CCCCCC",
            DEFAULT: "#FFFFFF",
          }
        },
      },
      dark: {
        colors: {},
      },
    },
  })],
}