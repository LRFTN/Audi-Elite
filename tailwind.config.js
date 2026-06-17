/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "audi-black": "#0E0E11",
        "audi-charcoal": "#1A1A1E",
        "audi-panel": "#24242B",
        "audi-white": "#FFFFFF",
        "audi-offwhite": "#F4F4F6",
        "audi-muted": "#9A9AA2",
        "audi-red": "#BB0A30",
        "audi-red-bright": "#E3001B",
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "sans-serif"],
      },
      boxShadow: {
        "red-glow": "0 0 40px rgba(227, 0, 27, 0.35)",
        "red-glow-lg": "0 0 80px rgba(227, 0, 27, 0.45)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(227,0,27,0.18), transparent 60%)",
      },
    },
  },
  plugins: [],
};
