/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Vite's root index.html
    "./public/index.html", // Public index.html template
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        // You can extend or override Tailwind's default cyan palette if needed
        // For this conversion, Tailwind's default cyan is generally sufficient.
        // Example:
        // cyan: {
        //   300: '#67e8f9',
        //   400: '#22d3ee',
        //   500: '#06b6d4',
        //   600: '#0891b2',
        // },
      },
      boxShadow: {
        'input-glow': '0 0 15px rgba(0, 190, 255, 0.3), 0 0 25px rgba(0, 190, 255, 0.2)',
        'button-glow-hover': '0 0 20px rgba(0, 220, 255, 0.7), 0 0 30px rgba(0, 220, 255, 0.5)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}