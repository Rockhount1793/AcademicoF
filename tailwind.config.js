/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        'custom': '#334155', // Replace with your custom color
      },
      borderRadius: {
        'custom': '0.5rem', // Replace with your custom border-radius value
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
