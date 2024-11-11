import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        md: "4px",
      },
      screens: {
        mo: { max: "734px" },
        pc: "735px",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      height: {
        nav: "45px",
      },
      spacing: {
        xxxs: "2px",
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        xxl: "32px",
        xxxl: "40px",
        nav: "45px",
      },
      colors: {
        //before rework
        "authentic-dark": "#9baaa9",
        "authentic-light": "rgb(201, 222, 220)",
        "authentic-brown": "rgb(145, 126, 106)",
        //after-rework
        "default-gray-bg": "#fafafc",
      },
      keyframes: {
        fadeLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeLeft: "fadeLeft 0.5s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
