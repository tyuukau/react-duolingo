import { type Config } from "tailwindcss";

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ["./node_modules/flowbite-react/**/*.js", "./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    screens: {
      '2xs': '360px',
      'xs': '384px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
