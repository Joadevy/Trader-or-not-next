/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-bg": "#1a202c",
        "dark-blue": "#0B2447",
        "dark-blue-100": "#19376D",
        "dark-blue-200": "#576CBC",
        "dark-blue-300": "#A5D7E8",
        "dark-title": "#FDFDFD",
        "dark-text": "#E2E8F0",
      },
    },
  },
  plugins: [],
};
