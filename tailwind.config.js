/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "rgb(var(--primary-color))",
        "secondary-color": "rgb(var(--secondary-color))",
        "secondary-800": "rgb(var(secondary-color-800))",
        "accent-color": "rgb(var(--accent-color))"
      },
    },
  },
}

