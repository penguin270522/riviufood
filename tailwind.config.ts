import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        btn: "linear-gradient(90deg,#f60,#ff9f00)",
      },
      colors: {
        primary: "var(--primary-color)",
        second: "var(--secondary-color)",
        "txt-primary": "var(--text-c-primary)",
        "txt-second": "var(--text-c-second)",
      },
      backgroundColor: {
        input: "var(--bg-input)",
      },
      padding: {
        "px-header": "var(--px-header)",
        "px-body": "var(--px-body)",
      },
    },
  },
  plugins: [],
};
export default config;
