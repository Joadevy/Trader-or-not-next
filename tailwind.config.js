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
        homeImage: "url('/img/bgPatternRed.webp')",
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
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in-right": "slideInRight 0.75s ease-out",
      },
    },
  },
  plugins: [],
};
