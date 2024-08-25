/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#6D28D9', // Ejemplo de un color personalizado
      },
      scale: {
        '102': '1.02', // Ejemplo de una escala personalizada
      },
      transitionProperty: {
        'transform': 'transform',
      },
    },
  },
  plugins: [],
}
