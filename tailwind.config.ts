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
      },
      colors: {
        "authentic-dark": "#9baaa9",
        "authentic-light": "rgb(201, 222, 220)",
        "authentic-brown": "rgb(145, 126, 106)",
      },
    },
  },
  plugins: [],
};
export default config;
