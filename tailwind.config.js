/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'rustic-brown': '#8B4513',
        'rustic-brown-dark': '#5D2906',
        'rustic-brown-light': '#A0522D',
        'rustic-gold': '#D4AF37',
        'rustic-cream': '#FFF8DC',
        'celestial-navy': '#0F1E4A',
        'celestial-dark': '#070E24',
        'celestial-blue': '#1A3A8F',
        'celestial-silver': '#C0C0C0',
        'celestial-gold': '#FFD700',
      }
    },
  },
  plugins: [],
}



