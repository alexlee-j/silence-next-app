import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {},
      height: {
        "h-screen-sub-footer": "calc(100vh - 46px)",
      },
    },
  },
  plugins: [],
  // darkMode: "class",
  // theme: {
  //   extend: {
  //     colors: {
  //       light: {
  //         background: "#ffffff",
  //         text: "#000000",
  //       },
  //       dark: {
  //         background: "#1a202c",
  //         text: "#ffffff",
  //       },
  //     },
  //   },
  // },
};
export default config;
