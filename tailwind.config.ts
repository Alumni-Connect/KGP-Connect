import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#dedcff", // secondary
          200: "#433bff", // accent
          300: "#2f27ce", // primary
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
