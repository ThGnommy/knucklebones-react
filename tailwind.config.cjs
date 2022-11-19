/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        eczar: ["Eczar", "serif"],
      },
      backgroundImage: {
        table:
          "url(https://images.unsplash.com/photo-1506968430777-bf7784a87f23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80)",
      },
      keyframes: {
        background: {
          "0%, 100%": { backgroundPosition: "40% 0%" },
          "50%": { backgroundPosition: "80% 50%" },
        },
      },
      animation: {
        background: "background 20s ease infinite",
      },
    },
  },
  plugins: [],
};
