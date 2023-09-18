import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["business"],
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
} satisfies Config;
