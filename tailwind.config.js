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
        // Updated tropical paradise theme colors (less bright)
        'tropical-teal': '#1A7B72',
        'tropical-teal-dark': '#0F5751',
        'tropical-teal-light': '#2A9D93',
        'tropical-coral': '#E67E22',
        'tropical-coral-light': '#F39C12',
        'tropical-sand': '#F5F0E6',
        'tropical-leaf': '#0E6655',
        'tropical-pink': '#C0392B',
      }
    },
  },
  plugins: [],
}





